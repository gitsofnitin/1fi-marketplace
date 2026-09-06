import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center rounded-[24px] border border-zinc-200 bg-white px-6 py-10 text-center shadow-[0_2px_8px_rgba(20,14,50,0.04)]">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ede8ff] text-[#712CDC]">
        {icon}
      </div>
      <h3 className="text-[17px] font-bold tracking-[-0.015em] text-gray-900">{title}</h3>
      <p className="mt-1.5 max-w-[34ch] text-[13.5px] leading-[1.45] text-gray-500">{description}</p>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#712CDC] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#5b24b5] transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
