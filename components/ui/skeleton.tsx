import { cn } from "@/lib/utils";
import React from "react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    // bg-[#e9e9ea]
    <div
      className={cn(
        "animate-pulse rounded-md  bg-gradient-to-r from-neutral-300 to-stone-400",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
