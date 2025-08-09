import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (!href) return;

      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const sectionLinks = document.querySelectorAll('a[href^="#"]');
    sectionLinks.forEach(link => {
      link.addEventListener('click', handleScroll);
    });

    return () => {
      sectionLinks.forEach(link => {
        link.removeEventListener('click', handleScroll);
      });
    };
  }, []);
};
