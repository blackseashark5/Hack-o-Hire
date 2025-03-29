/*
  # Create Term Sheets Tables

  1. New Tables
    - `term_sheets`
      - `id` (uuid, primary key)
      - `company_name` (text)
      - `valuation` (numeric)
      - `investment_amount` (numeric)
      - `equity_percentage` (numeric)
      - `investor_names` (text[])
      - `terms` (text[])
      - `date` (date)
      - `confidence_score` (numeric)
      - `source_file` (text)
      - `version` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `user_id` (uuid, foreign key)

    - `term_sheet_versions`
      - `id` (uuid, primary key)
      - `term_sheet_id` (uuid, foreign key)
      - `changes` (jsonb)
      - `version` (integer)
      - `created_at` (timestamptz)
      - `user_id` (uuid, foreign key)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

CREATE TABLE IF NOT EXISTS term_sheets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  valuation numeric NOT NULL CHECK (valuation > 0),
  investment_amount numeric NOT NULL CHECK (investment_amount > 0),
  equity_percentage numeric NOT NULL CHECK (equity_percentage > 0 AND equity_percentage <= 100),
  investor_names text[] NOT NULL,
  terms text[] NOT NULL,
  date date NOT NULL,
  confidence_score numeric NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
  source_file text NOT NULL,
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid NOT NULL REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS term_sheet_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  term_sheet_id uuid NOT NULL REFERENCES term_sheets(id) ON DELETE CASCADE,
  changes jsonb NOT NULL,
  version integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid NOT NULL REFERENCES auth.users(id)
);

ALTER TABLE term_sheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE term_sheet_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own term sheets"
  ON term_sheets
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own term sheet versions"
  ON term_sheet_versions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create term sheet versions"
  ON term_sheet_versions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to update term_sheets.updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_term_sheets_updated_at
  BEFORE UPDATE ON term_sheets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();