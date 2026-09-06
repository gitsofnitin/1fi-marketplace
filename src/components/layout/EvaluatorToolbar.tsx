import React from 'react';
import { Smartphone, Monitor, Bug, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

interface EvaluatorToolbarProps {
  isMobileFrame: boolean;
  onToggleMobileFrame: (val: boolean) => void;
  onTriggerSimulateError?: () => void;
}

export const EvaluatorToolbar: React.FC<EvaluatorToolbarProps> = ({
  isMobileFrame,
  onToggleMobileFrame,
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
    <aside
      aria-label="Evaluation Tools"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md border border-gray-200/90 px-3 py-1.5 shadow-lg shadow-purple-900/10 transition-all hover:border-[#712CDC]/40"
    >
      <div className="flex items-center gap-1.5 pr-2 border-r border-gray-200 text-[11px] text-gray-500 font-medium">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
        <span className="font-bold text-gray-800">1Fi Eval</span>
      </div>

      {/* Device View Switcher */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onToggleMobileFrame(!isMobileFrame)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
            isMobileFrame
              ? 'bg-[#712CDC] text-white shadow-xs'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title="Toggle Mobile Simulator Frame"
        >
          {isMobileFrame ? <Smartphone className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}
          <span>{isMobileFrame ? 'Mobile Frame' : 'Desktop Full'}</span>
        </button>
      </div>

      {/* Test Error Flow Toggle */}
      <button
        type="button"
        onClick={handleToggleError}
        title="Simulate network error to test error handling and retry button"
        className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full border transition-all ${
          isErrorMode
            ? 'bg-red-50 text-red-600 border-red-200 animate-pulse'
            : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
        }`}
      >
        <Bug className="h-3 w-3" />
        <span>{isErrorMode ? 'Error: ON' : 'Test Error'}</span>
      </button>
    </aside>
  );
};
