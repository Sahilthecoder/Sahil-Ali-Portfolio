import gsap from 'gsap';
import * as React from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  backgroundImages?: string[];
  className?: string;
  // No children prop needed
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText = 'Get Started',
  onCtaClick,
  backgroundImages = [],
  className = '',
}) => {
  const backgroundImage = React.useMemo(() => {
    if (!backgroundImages.length) return undefined;
    const index = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[index];
  }, [backgroundImages]);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const subtitleRef = React.useRef<HTMLParagraphElement>(null);
  const ctaRef = React.useRef<HTMLButtonElement>(null);
  const animationTimelineRef = React.useRef<gsap.core.Tween | null>(null);

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Store refs in variables for cleanup
    const titleElement = titleRef.current;
    const subtitleElement = subtitleRef.current;
    const ctaElement = ctaRef.current;
    const container = containerRef.current;

    // Define event handlers with cleanup
    const handleMouseEnter = (): void => {
      if (!ctaElement) return;

      gsap.to(ctaElement, {
        scale: 1.03,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = (): void => {
      if (!ctaElement) return;

      gsap.to(ctaElement, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Set up animations
    const setupTitleAnimation = (): void => {
      if (!titleElement) return;

      // Remove initial transform and opacity classes that were added for SSR/initial render
      titleElement.classList.remove('opacity-0', 'translate-y-8');

      gsap.to(titleElement, {
        duration: 0.8,
        delay: 0.2,
        onComplete: () => {
          titleElement?.classList.add('animate-float');
        },
      });
    };

    const setupSubtitleAnimation = (): void => {
      if (!subtitleElement) return;

      // Remove initial transform and opacity classes
      subtitleElement.classList.remove('opacity-0', 'translate-y-5');

      gsap.to(subtitleElement, {
        duration: 0.8,
        delay: 0.4,
      });
    };

    const setupCtaAnimation = (): void => {
      if (!ctaElement) return;

      // Remove initial transform and opacity classes
      ctaElement.classList.remove('opacity-0', 'translate-y-5', 'scale-95');

      gsap.to(ctaElement, {
        duration: 0.8,
        delay: 0.6,
        scale: 0.95,
      });

      // Add hover effect for CTA
      ctaElement.addEventListener('mouseenter', handleMouseEnter);
      ctaElement.addEventListener('mouseleave', handleMouseLeave);
    };

    const setupStaggeredAnimations = (): void => {
      if (!container) return;

      gsap.to(container, {
        stagger: 0.15,
        duration: 0.6,
        delay: 0.3,
        y: 20,
        opacity: 0,
        ease: 'back.out(1.7)',
      });
    };

    const setupScrollAnimations = (): void => {
      if (!container || !titleElement || !subtitleElement || !ctaElement) return;

      // Create a timeline for the scroll animation
      const scrollAnimation = gsap.timeline({ paused: true });

      // Add animations to the timeline
      scrollAnimation.to(
        titleElement,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
        },
        0
      );

      scrollAnimation.to(
        subtitleElement,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: 'power2.out',
        },
        0
      );

      scrollAnimation.to(
        ctaElement,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.6,
          ease: 'power2.out',
        },
        0
      );

      // Create the scroll trigger with the animation
      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom-=100',
        onEnter: () => scrollAnimation.play(),
        onEnterBack: () => scrollAnimation.play(),
        onLeave: () => scrollAnimation.pause(0),
        onLeaveBack: () => scrollAnimation.pause(0),
      });
    };

    // Execute all animation setups
    setupTitleAnimation();
    setupSubtitleAnimation();
    setupCtaAnimation();
    setupStaggeredAnimations();
    setupScrollAnimations();

    // Cleanup function
    return (): void => {
      // Remove event listeners
      ctaElement?.removeEventListener('mouseenter', handleMouseEnter);
      ctaElement?.removeEventListener('mouseleave', handleMouseLeave);

      // Kill GSAP animations
      animationTimelineRef.current?.kill();
      gsap.killTweensOf([titleElement, subtitleElement, ctaElement].filter(Boolean));
    };
  }, []);

  // Utility function to conditionally join class names
  function cn(...classes: (string | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <section
      ref={containerRef}
      className={cn(
        'relative flex h-[40vh] min-h-[350px] items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900',
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/70 dark:via-black/60 dark:to-black/80" />
        {backgroundImages?.map((image, index) => (
          <div
            key={`bg-${index}`}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === 0 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              transition: 'opacity 1s ease-in-out',
              filter: 'brightness(0.7) contrast(1.1)',
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background dark:from-dark-background/50 dark:via-dark-background/80 dark:to-dark-background" />

      <div className="relative z-10 max-w-4xl px-4 text-center">
        {title && (
          <h1
            ref={titleRef}
            className="mb-4 text-4xl font-bold tracking-tight text-white dark:text-gray-100 sm:text-5xl lg:text-6xl drop-shadow-md"
          >
            {title}
          </h1>
        )}
        {subtitle && (
          <p
            ref={subtitleRef}
            className="mx-auto mb-8 max-w-2xl text-lg text-gray-100 dark:text-gray-200 sm:text-xl md:mb-12 drop-shadow"
          >
            {subtitle}
          </p>
        )}

        {ctaText && onCtaClick && (
          <button
            type="button"
            ref={ctaRef}
            onClick={onCtaClick}
            className="group relative bg-accent hover:bg-accent/90 dark:bg-dark-accent dark:hover:bg-dark-accent/90 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent/40 dark:focus:ring-dark-accent/40 flex items-center mx-auto shadow-lg hover:shadow-accent/30 dark:hover:shadow-dark-accent/30 opacity-0 translate-y-5 scale-95"
          >
            <span className="relative z-10">{ctaText}</span>
            <svg
              className="ml-2 -mr-1 w-5 h-5 inline-block transition-transform duration-300 group-hover:translate-x-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Animated scroll indicator */}
      
    </section>
  );
};

export default Hero;
