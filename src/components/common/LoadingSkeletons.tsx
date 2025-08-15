import React from 'react';
import { motion } from 'framer-motion';

// Base skeleton component
const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div
    className={`bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    animate={{
      opacity: [0.4, 1, 0.4]
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }}
  />
);

// Page skeleton for initial loading
export const PageSkeleton: React.FC = () => (
  <div className="min-h-screen bg-white dark:bg-gray-900 p-6 space-y-6">
    {/* Header skeleton */}
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-20 h-4" />
        </div>
      </div>
      <div className="flex space-x-4">
        <Skeleton className="w-20 h-8" />
        <Skeleton className="w-20 h-8" />
        <Skeleton className="w-20 h-8" />
      </div>
    </div>

    {/* Hero section skeleton */}
    <div className="text-center space-y-6 py-20">
      <Skeleton className="w-64 h-12 mx-auto" />
      <Skeleton className="w-96 h-6 mx-auto" />
      <Skeleton className="w-48 h-6 mx-auto" />
      <div className="flex justify-center space-x-4">
        <Skeleton className="w-32 h-12" />
        <Skeleton className="w-32 h-12" />
      </div>
    </div>

    {/* Content sections skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
          <Skeleton className="w-full h-48" />
          <Skeleton className="w-3/4 h-6" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-2/3 h-4" />
        </div>
      ))}
    </div>
  </div>
);

// Project card skeleton
export const ProjectCardSkeleton: React.FC = () => (
  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
    <Skeleton className="w-full h-48" />
    <div className="space-y-2">
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-2/3 h-4" />
    </div>
    <div className="flex space-x-2">
      <Skeleton className="w-16 h-6" />
      <Skeleton className="w-20 h-6" />
      <Skeleton className="w-14 h-6" />
    </div>
  </div>
);

// Navigation skeleton
export const NavigationSkeleton: React.FC = () => (
  <div className="flex justify-between items-center p-6">
    <div className="flex items-center space-x-4">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="w-24 h-5" />
        <Skeleton className="w-16 h-3" />
      </div>
    </div>
    <div className="flex space-x-6">
      <Skeleton className="w-16 h-5" />
      <Skeleton className="w-16 h-5" />
      <Skeleton className="w-16 h-5" />
      <Skeleton className="w-16 h-5" />
    </div>
  </div>
);

// Content skeleton
export const ContentSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <div className="space-y-3">
    {[...Array(lines)].map((_, i) => (
      <Skeleton
        key={i}
        className={`h-4 ${
          i === lines - 1 ? 'w-2/3' : 'w-full'
        }`}
      />
    ))}
  </div>
);

export default Skeleton;
