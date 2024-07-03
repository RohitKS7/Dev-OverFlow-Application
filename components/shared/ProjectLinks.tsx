"use client";
import { projectLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = {
  align: "start",
  loop: true,
  // breakpoints: {
  //   "(max-width: 640px)": { axis: "y" }, // --> 420px screens and axis will change from "X" (right to left scroll) to "Y" (down to up scroll)
  // },
};

const ProjectLinks = () => {
  const [emblaRef] = useEmblaCarousel(OPTIONS);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container items-center justify-center gap-5 ">
        {projectLinks.map((item) => (
          <div
            key={item.label + item.projectlink}
            className=" embla__slide  flex cursor-pointer items-center justify-center rounded-md bg-[#ffdada]  max-sm:p-3 sm:px-3 sm:pt-3"
          >
            <div className="flex-center max-w-40 flex-col gap-3">
              <Link
                href={item.codelink}
                className="body-semibold group relative w-full text-center text-gray-700"
              >
                <div>
                  {item.label}
                  <p className="mt-[2px]">{item.type}</p>
                  <div className="paragraph-semibold project-hover-shadow absolute inset-x-0 top-[-40px] flex items-end justify-center bg-[#ffdada] p-[5px] text-gray-700 opacity-0 duration-300 group-hover:opacity-100 max-md:hidden">
                    Code
                  </div>
                </div>
              </Link>
              <Link href={item.projectlink} className="group relative">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={150}
                  height={150}
                  className="object-contain"
                />
                <div className="paragraph-semibold absolute inset-x-0 bottom-0 flex items-end justify-center bg-[#ffdada] text-gray-700 opacity-0 duration-300 group-hover:opacity-100 md:hidden">
                  Website
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectLinks;

//  On Screen Size bigger than tablet
//  @media (max-width: 768px) {
// .embla__slide {
// flex: 0 0 50%; /* Breakpoint SM slide covers 50% of the viewport */
// }
// }
