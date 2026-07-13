import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function Card({
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-[32px]",
        "bg-[var(--surface)]/90",
        "backdrop-blur-md",
        "border",
        "border-white/50",
        "shadow-[0_12px_40px_rgba(0,0,0,0.08)]",
        "transition-all",
        "duration-300",
        "hover:-translate-y-1",
        "hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;