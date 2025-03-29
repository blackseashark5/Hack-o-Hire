import React from 'react';
import { ProcessedData, ValidationError } from '../types';
import { AlertCircle, CheckCircle, Clock, Database } from 'lucide-react';
import { format } from 'date-fns';

interface ResultsDisplayProps {
  results: ProcessedData;
  validationErrors: ValidationError[];
  onSave?: () => void;
  isSaving?: boolean;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  validationErrors,
  onSave,
  isSaving
}) => {
  return (
    <div className="mt-6 space-y-6">
      <div className="bg-white dark:bg-gray-850 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-500">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Database className="w-5 h-5 mr-2.5" />
            Extracted Data
          </h3>
          <div className="mt-2.5 flex items-center space-x-4">
            <span className="text-blue-50">
              Confidence Score: {(results.confidence * 100).toFixed(1)}%
            </span>
            <span className="text-blue-200">•</span>
            <span className="text-blue-50 flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              {format(new Date(results.timestamp), 'PPpp')}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {Object.entries(results.data).map(([key, value]) => (
              <div key={key} className="bg-gray-50 dark:bg-gray-800/50 px-4 py-5 rounded-lg">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </dt>
                <dd className="mt-2 text-lg text-gray-900 dark:text-white">
                  {Array.isArray(value) ? (
                    <ul className="list-disc list-inside space-y-1.5">
                      {value.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : typeof value === 'number' ? (
                    value.toLocaleString('en-US', {
                      style: key.includes('percentage') ? 'percent' : 'decimal',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2
                    })
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {validationErrors.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-5 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h4 className="ml-2.5 text-lg font-medium text-red-800 dark:text-red-200">
              Validation Issues
            </h4>
          </div>
          <ul className="mt-3 list-disc list-inside space-y-1.5">
            {validationErrors.map((error, index) => (
              <li key={index} className="text-red-700 dark:text-red-300 ml-6">
                {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {onSave && (
        <div className="flex justify-end">
          <button
            onClick={onSave}
            disabled={isSaving || validationErrors.length > 0}
            className={`
              inline-flex items-center px-5 py-2.5 rounded-lg text-white
              ${validationErrors.length > 0
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'}
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              dark:focus:ring-offset-gray-900
            `}
          >
            {isSaving ? (
              <>
                <Clock className="animate-spin w-5 h-5 mr-2" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Save to Database
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};