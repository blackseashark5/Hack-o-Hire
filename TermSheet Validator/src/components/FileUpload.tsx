import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelect(acceptedFiles);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'image/*': ['.png', '.jpg', '.jpeg']
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? 'dropzone-active' : 'border-gray-300 dark:border-gray-600'}`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
      <p className="text-lg text-gray-600 dark:text-gray-300">
        {isDragActive
          ? 'Drop the files here...'
          : 'Drag & drop files here, or click to select files'}
      </p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Supported formats: PDF, Word, Excel, Images
      </p>
    </div>
  );
};