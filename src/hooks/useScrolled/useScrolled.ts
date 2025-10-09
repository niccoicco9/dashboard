import { useEffect, useState } from 'react';

export function useScrolled(threshold: number = 10) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = (typeof window.scrollY === 'number' ? window.scrollY : window.pageYOffset) || document.documentElement.scrollTop || 0;
      setIsScrolled(currentY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}


