import React from 'react';
import { Loader2, Microscope } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Analyzing apple leaf..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Microscope className="w-6 h-6 text-green-600" />
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700 mb-1">{message}</p>
        <p className="text-sm text-gray-500">Using AI-powered disease detection</p>
      </div>
      
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};