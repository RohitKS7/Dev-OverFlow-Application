"use client";
import { projectLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProjectLinks = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Carousel
      className="w-full max-w-screen-md"
      opts={{
        align: "center",
        loop: true,
        dragFree: true,
        breakpoints: {
          "(min-width: 768px)": { align: "start" },
          "(min-width: 1024px)": { align: "start", dragFree: false },
        },
      }}
    >
      <CarouselContent>
        {projectLinks.map((item) => (
          <CarouselItem
            key={item.label + item.projectlink}
            className="flex-center mx-3 w-full basis-8/12 rounded-md bg-[#ffdada] pl-0 pt-3 md:basis-1/3 lg:basis-1/4"
          >
            <div className="flex-center max-w-40 flex-col gap-3">
              <Link
                href={item.codelink}
                className="body-semibold group relative w-full text-center text-gray-700"
                 target="_blank"
              >
                <div className="">
                  {item.label}
                  <p className="mt-[2px]">{item.type}</p>
                  <div className="paragraph-semibold project-hover-shadow absolute inset-x-0 top-[45px] z-50 flex items-end justify-center bg-primary-500 p-[5px] text-[#f8f8ff]  opacity-0 duration-300 group-hover:opacity-100 max-md:hidden">
                    Cod
                  </div>
                </div>
              </Link>
              <Link href={item.projectlink} className="group relative"  target="_blank">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={150}
                  height={150}
                  className="object-contain"
                />
                <div className="paragraph-semibold absolute inset-x-0 bottom-0 flex items-end justify-center bg-primary-500 text-[#f8f8ff] opacity-0 duration-300 group-hover:opacity-100 max-md:hidden">
                  Website
                </div>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Show Arrows on large screens only */}
      {isMobile && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
};

export default ProjectLinks;
