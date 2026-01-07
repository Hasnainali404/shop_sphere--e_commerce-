import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square w-full bg-slate-200 rounded-xl mb-4"></div>
      
      {/* Text Skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 rounded-full w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded-full w-1/2"></div>
      </div>
      
      {/* Price and Button Skeleton */}
      <div className="flex items-center justify-between mt-6">
        <div className="h-6 bg-slate-200 rounded-full w-20"></div>
        <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;