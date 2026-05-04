import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = "", 
  width, 
  height, 
  borderRadius = "0.75rem" 
}) => {
  return (
    <div 
      className={`animate-pulse bg-slate-200 ${className}`}
      style={{ 
        width: width, 
        height: height, 
        borderRadius: borderRadius 
      }}
    />
  );
};
