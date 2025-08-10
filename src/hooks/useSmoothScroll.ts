import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      // Get header height (adjust selector if your header has a different class/id)
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80; // Fallback to 80px
      
      // Calculate scroll position with offset
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 20; // 20px extra space

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL without adding to history
      window.history.pushState(null, '', href);
    };

    // Add click event to all anchor links with hash
    const sectionLinks = document.querySelectorAll('a[href^="#"]');
    sectionLinks.forEach(link => {
      link.addEventListener('click', handleScroll);
    });

    // Handle initial hash in URL
    if (window.location.hash) {
      const targetElement = document.getElementById(window.location.hash.replace('#', ''));
      if (targetElement) {
        // Small delay to ensure the page has loaded
        setTimeout(() => {
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 80;
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight - 20;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }

    return () => {
      sectionLinks.forEach(link => {
        link.removeEventListener('click', handleScroll);
      });
    };
  }, []);
};
