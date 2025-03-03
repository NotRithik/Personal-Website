'use client'

// components/DelayedLink.tsx
import Link from 'next/link';

interface DelayedLinkProps {
  href: string;
  delay?: number; // Optional delay, default to 0 or some value
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  // ... other props you might want to pass to <Link>
}

const DelayedLink: React.FC<DelayedLinkProps> = ({ href, delay = 0, children, className, style, ...rest }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault(); // Prevent default <Link> navigation
    setTimeout(() => {
      window.location.href = href; // Navigate after delay (or router.push if possible)
    }, delay);
  };

  return (
    <Link href={href} onClick={handleClick} className={className} style={style} {...rest}>
      {children}
    </Link>
  );
};

export default DelayedLink;