import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <div className="flex w-full justify-between">
        <div className="flex gap-5 max-md:flex-col">
          <Skeleton className="size-[140px] rounded-full" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-32 rounded-xl " />
            <Skeleton className="h-8 w-20 rounded-xl" />
            <Skeleton className="h-8 w-32 rounded-xl" />
          </div>
        </div>
        <Skeleton className="h-12 w-40" />
      </div>

      <Skeleton className="my-12 h-7 w-16" />

      <div className="mb-12 flex w-full flex-wrap justify-between gap-8 ">
        <Skeleton className="h-32 w-56" />
        <Skeleton className="h-32 w-56" />
        <Skeleton className="h-32 w-56" />
        <Skeleton className="h-32 w-56" />
      </div>

      <Skeleton className="my-14 h-10 w-40" />

      <div className="flex flex-wrap gap-6">
        {[1, 2, 3, 5, 6, 7, 8].map((item) => (
          <Skeleton key={item} className="h-60 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
