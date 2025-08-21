import { useState } from 'react';
import { DEFAULT_IMAGE_FALLBACK } from '@/lib/constants';

interface ImageWithFallbackProps {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
}

export function ImageWithFallback({
  src,
  fallback = DEFAULT_IMAGE_FALLBACK,
  alt,
  className = '',
  ...props
}: ImageWithFallbackProps & Omit<React.ImgHTMLAttributes<HTMLImageElement>, keyof ImageWithFallbackProps>) {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
      {...props}
    />
  );
}
