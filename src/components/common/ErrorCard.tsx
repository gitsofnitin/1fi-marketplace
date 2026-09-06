import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorCardProps {
  message: string;
  onRetry: () => void;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center rounded-[24px] border border-red-200 bg-red-50/70 p-6 text-center shadow-sm">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-red-900">Unable to load data</h3>
      <p className="mt-1 text-xs leading-relaxed text-red-700 max-w-[32ch]">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-red-700 transition-colors active:scale-95"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        Retry Request
      </button>
    </div>
  );
};
