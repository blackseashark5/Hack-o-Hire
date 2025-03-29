import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FileUpload } from './components/FileUpload';
import { ProcessingStatus } from './components/ProcessingStatus';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Navigation } from './components/Navigation';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Settings } from './components/Settings';
import { PastData } from './components/PastData';
import { Brain, Moon, Sun } from 'lucide-react';
import { ProcessedData, ValidationError } from './types';
import { validateTermSheetData } from './utils/validation';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentFile, setCurrentFile] = useState('');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ProcessedData | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleFileSelect = async (files: File[]) => {
    setIsProcessing(true);
    setProgress(0);

    for (const file of files) {
      setCurrentFile(file.name);
      
      for (let i = 0; i <= 100; i += 20) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      const mockResult: ProcessedData = {
        data: {
          companyName: "TechCorp Inc.",
          valuation: 10000000,
          investmentAmount: 2000000,
          equityPercentage: 20,
          investorNames: ["Angel Investor A", "VC Fund B"],
          terms: ["Board Seat", "Pro-rata Rights"],
          date: "2024-03-15"
        },
        confidence: 0.85,
        source: file.name,
        timestamp: new Date().toISOString()
      };

      const errors = validateTermSheetData(mockResult.data);
      setValidationErrors(errors);
      setResults(mockResult);
    }

    setIsProcessing(false);
  };

  const MainContent = () => {
    const location = useLocation();

    return (
      <div className="flex-1 p-8">
        {location.pathname === '/' && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Term Sheet Processing
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Upload your term sheets and let AI extract the important details
              </p>
            </div>

            <FileUpload onFileSelect={handleFileSelect} />

            {isProcessing && (
              <ProcessingStatus
                currentFile={currentFile}
                progress={progress}
                status="Extracting and validating data..."
              />
            )}

            {results && !isProcessing && (
              <ResultsDisplay
                results={results}
                validationErrors={validationErrors}
                onSave={() => {}}
                isSaving={false}
              />
            )}
          </>
        )}
        {location.pathname === '/dashboard' && <Dashboard />}
        {location.pathname === '/past-data' && <PastData />}
        {location.pathname === '/settings' && <Settings />}
      </div>
    );
  };

  return (
    <Router>
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
        <Navigation 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          isDarkMode={isDarkMode}
        />
        
        <div className="flex pt-16">
          <Sidebar isOpen={isSidebarOpen} />
          <MainContent />
        </div>
      </div>
    </Router>
  );
}

export default App;