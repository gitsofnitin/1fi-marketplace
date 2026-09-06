import React from 'react';

export const SkeletonLoader: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse gap-3.5 rounded-[20px] border border-zinc-200 bg-white p-3.5 shadow-[0_2px_6px_rgba(20,14,50,0.04)]"
        >
          {/* Thumbnail Skeleton */}
          <div className="h-20 w-20 shrink-0 rounded-2xl border border-zinc-100 bg-zinc-100" />

          {/* Content Skeleton */}
          <div className="min-w-0 flex-1 py-1">
            <div className="flex items-center justify-between gap-3">
              <div className="h-4 w-3/5 rounded-full bg-zinc-200" />
              <div className="h-[18px] w-14 shrink-0 rounded-full bg-zinc-100" />
            </div>
            <div className="mt-2 h-3.5 w-1/3 rounded-full bg-zinc-100" />
            <div className="mt-3 flex items-center justify-between">
              <div className="h-4 w-24 rounded-full bg-purple-100" />
              <div className="h-6 w-16 rounded-full bg-zinc-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
