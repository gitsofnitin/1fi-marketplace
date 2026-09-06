import React from 'react';

export const SkeletonLoader: React.FC<{ count?: number; isMobileFrame?: boolean }> = ({
  count = 6,
  isMobileFrame = false,
}) => {
  return (
    <div className={isMobileFrame ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col justify-between animate-pulse rounded-[22px] border border-zinc-200/80 bg-white p-3 shadow-xs"
        >
          <div>
            {/* Square Thumbnail Skeleton */}
            <div className="aspect-square w-full rounded-[18px] bg-zinc-100 border border-zinc-100" />

            {/* Brand & Name Skeleton */}
            <div className="mt-2.5 px-0.5 space-y-1.5">
              <div className="h-2.5 w-12 rounded-full bg-zinc-200" />
              <div className="h-3.5 w-full rounded-md bg-zinc-200" />
              <div className="h-3.5 w-3/4 rounded-md bg-zinc-200" />
            </div>
          </div>

          {/* Price & EMI Pill Skeleton */}
          <div className="mt-3 px-0.5 border-t border-zinc-100 pt-2 space-y-2">
            <div className="h-4 w-20 rounded-md bg-zinc-200" />
            <div className="h-6 w-full rounded-xl bg-purple-50 border border-purple-100/50" />
          </div>
        </div>
      ))}
    </div>
  );
};
