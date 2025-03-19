import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

const PostButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "px-4 py-2 text-sm rounded-md font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          variant === "outline"
            ? "border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--foreground)] hover:bg-[var(--muted)]"
            : "bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--accent)]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

PostButton.displayName = "PostButton";

export { PostButton };
