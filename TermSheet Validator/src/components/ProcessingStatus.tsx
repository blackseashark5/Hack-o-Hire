import React from 'react';
import { Loader2 } from 'lucide-react';

interface ProcessingStatusProps {
  currentFile: string;
  progress: number;
  status: string;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  currentFile,
  progress,
  status
}) => {
  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-3">
        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
        <span className="font-medium text-gray-700">Processing: {currentFile}</span>
      </div>
      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">{status}</p>
      </div>
    </div>
  );
};