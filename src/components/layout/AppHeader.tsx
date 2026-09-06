import React from 'react';
import { ArrowLeft, Sparkles, Bug } from 'lucide-react';
import { api } from '../../services/api';

interface AppHeaderProps {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  onTriggerSimulateError?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = 'Shop',
  onBack,
  showBack = false,
  onTriggerSimulateError,
}) => {
  const [isErrorMode, setIsErrorMode] = React.useState(api.getSimulateError());

  const handleToggleError = () => {
    const next = !isErrorMode;
    api.setSimulateError(next);
    setIsErrorMode(next);
    if (onTriggerSimulateError) {
      onTriggerSimulateError();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Back button or 1Fi Brand Logo */}
        <div className="flex items-center gap-2.5">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors active:scale-95"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#712CDC] to-[#a203d5] text-white shadow-sm font-black text-sm">
                1Fi
              </div>
              <span className="text-base font-bold tracking-tight text-gray-900">1Fi</span>
            </div>
          )}
          {title && title !== '1Fi' && (
            <h1 className="text-[17px] font-bold tracking-[-0.015em] text-gray-900 ml-1">
              {title}
            </h1>
          )}
        </div>

        {/* Right: Badge and Dev/Evaluator Tool */}
        <div className="flex items-center gap-2">
          {/* Quick Evaluator Helper: Simulate Network Error */}
          <button
            type="button"
            onClick={handleToggleError}
            title={isErrorMode ? 'Disable simulated network error' : 'Test simulated network error & retry flow'}
            className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
              isErrorMode
                ? 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Bug className="h-3 w-3" />
            <span>{isErrorMode ? 'Error: ON' : 'Test Error'}</span>
          </button>

          <div className="flex items-center gap-1 rounded-full bg-[#f5f0ff] border border-[#ece5ff] px-2.5 py-1 text-[11px] font-semibold text-[#712CDC]">
            <Sparkles className="h-3 w-3 fill-[#712CDC]" />
            <span>LAMF Credit</span>
          </div>
        </div>
      </div>
    </header>
  );
};
