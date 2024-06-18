import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <h1 className="h1-bold text-gray500_light900"> All Questions </h1>

      <div className="mt-11 flex flex-wrap gap-5">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-28" />
      </div>

      <div className="mb-12 mt-6 gap-5 max-md:hidden md:flex">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {[1, 2, 3, 5, 6, 7, 8].map((item) => (
          <Skeleton key={item} className="h-60 w-full rounded-xl " />
        ))}
      </div>
    </section>
  );
};

export default Loading;
