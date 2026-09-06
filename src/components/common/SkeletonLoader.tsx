import React from 'react';

export const SkeletonLoader: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col animate-pulse rounded-[24px] border border-zinc-200 bg-white p-4 shadow-[0_2px_6px_rgba(20,14,50,0.04)]"
        >
          {/* Image Skeleton */}
          <div className="h-48 w-full rounded-2xl border border-zinc-100 bg-zinc-100" />

          {/* Content Skeleton */}
          <div className="mt-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-3 w-16 rounded bg-zinc-200" />
              <div className="h-3 w-12 rounded bg-zinc-100" />
            </div>
            <div className="h-4 w-4/5 rounded bg-zinc-200" />
            <div className="h-3 w-3/5 rounded bg-zinc-100" />
          </div>

          <div className="mt-4 border-t border-zinc-100 pt-3 flex items-center justify-between">
            <div className="h-5 w-24 rounded bg-zinc-200" />
            <div className="h-6 w-20 rounded-full bg-purple-100" />
          </div>
        </div>
      ))}
    </div>
  );
};
