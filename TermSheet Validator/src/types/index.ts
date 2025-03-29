export interface TermSheetData {
  companyName: string;
  valuation: number;
  investmentAmount: number;
  equityPercentage: number;
  investorNames: string[];
  terms: string[];
  date: string;
}

export interface ProcessedData {
  data: TermSheetData;
  confidence: number;
  source: string;
  timestamp: string;
}

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface Database {
  public: {
    Tables: {
      term_sheets: {
        Row: {
          id: string;
          company_name: string;
          valuation: number;
          investment_amount: number;
          equity_percentage: number;
          investor_names: string[];
          terms: string[];
          date: string;
          confidence_score: number;
          source_file: string;
          version: number;
          created_at: string;
          updated_at: string;
          user_id: string;
        };
        Insert: Omit<Database['public']['Tables']['term_sheets']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['term_sheets']['Insert']>;
      };
      term_sheet_versions: {
        Row: {
          id: string;
          term_sheet_id: string;
          changes: Record<string, any>;
          version: number;
          created_at: string;
          user_id: string;
        };
        Insert: Omit<Database['public']['Tables']['term_sheet_versions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['term_sheet_versions']['Insert']>;
      };
    };
  };
}