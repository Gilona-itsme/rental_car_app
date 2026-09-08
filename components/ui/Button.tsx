import type { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        variant === "primary" ? "btn-primary" : "btn-outline",
        className
      )}
      {...props}
    />
  );
}
