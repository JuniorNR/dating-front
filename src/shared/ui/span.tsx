import { FC } from "react";
import { cn } from "../lib/cn";

export const Span: FC<{ children: React.ReactNode, className?: string, color?: 'blue' | 'green' | 'red' | 'orange' }> = ({ children, className, color }) => {
  const colors = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    red: 'text-red-500',
    orange: 'text-orange-500',
  };
  const colorClass = colors[color as keyof typeof colors];
	return <span className={cn(className, color ? `${colorClass} font-bold` : 'font-bold')}>{children}</span>;
};