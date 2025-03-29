import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, Mail } from 'lucide-react';
import DatePicker from 'react-datepicker';
import emailjs from '@emailjs/browser';
import "react-datepicker/dist/react-datepicker.css";

interface TermSheet {
  id: string;
  company_name: string;
  valuation: number;
  investment_amount: number;
  equity_percentage: number;
  date: string;
  confidence_score: number;
}

export const PastData: React.FC = () => {
  const [termSheets, setTermSheets] = useState<TermSheet[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  useEffect(() => {
    fetchTermSheets();
  }, [selectedDate]);

  const fetchTermSheets = async () => {
    setLoading(true);
    try {
      let query = supabase.from('term_sheets').select('*');
      
      if (selectedDate) {
        query = query.eq('date', selectedDate.toISOString().split('T')[0]);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      setTermSheets(data || []);
    } catch (error) {
      console.error('Error fetching term sheets:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async (termSheet: TermSheet) => {
    setEmailSending(true);
    try {
      const templateParams = {
        to_email: 'ranveer4us@gmail.com',
        company_name: termSheet.company_name,
        valuation: termSheet.valuation.toLocaleString(),
        investment_amount: termSheet.investment_amount.toLocaleString(),
        equity_percentage: termSheet.equity_percentage,
        date: new Date(termSheet.date).toLocaleDateString(),
      };

      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        templateParams,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Past Term Sheets
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              className="pl-10 input-field"
              placeholderText="Filter by date"
              isClearable
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading term sheets...</p>
        </div>
      ) : termSheets.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No term sheets found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {termSheets.map((termSheet) => (
            <div key={termSheet.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {termSheet.company_name}
                </h3>
                <button
                  onClick={() => sendEmail(termSheet)}
                  disabled={emailSending}
                  className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </button>
              </div>
              
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Valuation</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    ${termSheet.valuation.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Investment</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    ${termSheet.investment_amount.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Equity</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    {termSheet.equity_percentage}%
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Date</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    {new Date(termSheet.date).toLocaleDateString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Confidence</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    {(termSheet.confidence_score * 100).toFixed(1)}%
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};