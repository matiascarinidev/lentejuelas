"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputValidatedProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function InputValidated({
  error,
  className,
  ...props
}: InputValidatedProps) {
  return (
    <div className="space-y-1">
      <Input
        className={cn(
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
