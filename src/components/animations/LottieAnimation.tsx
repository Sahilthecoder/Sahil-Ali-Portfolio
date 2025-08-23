import React, { useRef, Suspense, lazy } from 'react';
import { cn } from '@/lib/utils';
import { LottieRefCurrentProps } from 'lottie-react';

// Lazy load Lottie to improve initial load performance
const Lottie = lazy(() => import('lottie-react'));

interface AnimationAsset {
  id: string;
  w?: number;
  h?: number;
  u?: string;
  p?: string;
  e?: number;
  layers?: unknown[];
}

interface AnimationLayer {
  ddd?: number;
  ind?: number;
  ty: number;
  nm?: string;
  refId?: string;
  sr?: number;
  ks: Record<string, unknown>;
  ao?: number;
  ip?: number;
  op?: number;
  st?: number;
  bm?: number;
}

interface AnimationData {
  v?: string;
  fr?: number;
  ip?: number;
  op?: number;
  w?: number;
  h?: number;
  nm?: string;
  ddd?: number;
  assets?: AnimationAsset[];
  layers?: AnimationLayer[];
  markers?: unknown[];
}

interface LottieAnimationProps {
  animationData: AnimationData | null;
  className?: string;
  height?: number | string;
  width?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  className = '',
  height = '100%',
  width = '100%',
  style,
  onComplete,
  ...rest
}) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  if (!animationData) {
    return (
      <div 
        className={cn('bg-muted/20 rounded-lg flex items-center justify-center', className)}
        style={{ width, height, ...style }}
      >
        <span className="text-muted-foreground">No animation data</span>
      </div>
    );
  }

  return (
    <div className={className} style={{ width, height, ...style }}>
      <Suspense fallback={
        <div className="w-full h-full bg-muted/20 animate-pulse rounded-lg" />
      }>
        <Lottie
          animationData={animationData}
          loop={loop}
          autoplay={autoplay}
          lottieRef={lottieRef}
          onComplete={onComplete}
          {...rest}
        />
      </Suspense>
    </div>
  );
};

export default LottieAnimation;
