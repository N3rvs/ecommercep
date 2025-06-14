import { Zap } from 'lucide-react';
import Link from 'next/link';

export function Logo({ size = 32, className, textSize = "text-xl" }: { size?: number; className?: string, textSize?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className || ''}`} aria-label="ElectroLocal Home">
      <Zap className="text-primary group-hover:text-accent transition-colors duration-300" size={size} strokeWidth={2.5} />
      <span className={`${textSize} font-bold text-foreground group-hover:text-primary transition-colors duration-300`}>ElectroLocal</span>
    </Link>
  );
}
