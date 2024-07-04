import ProjectLinks from "@/components/shared/ProjectLinks";
import { socialLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const IntroPage = () => {
  return (
    <main className="flex-center min-h-screen w-full bg-[#ffdada] ">
      {/* Floating Container */}
      <div className="intro-shadow relative  flex h-[85dvh] max-h-[85dvh] w-full max-w-[70dvw] flex-col items-center justify-between gap-6 overflow-hidden rounded-md bg-[#f8f8ff] md:h-auto md:max-h-[75dvh]  md:gap-10">
        {/* Creator & Project Name */}
        <div className="flex-center mt-4 flex-col gap-6 max-md:mx-4">
          <Link href="/home" className="mt-4 flex items-center gap-3">
            <Image
              src="/assets/images/site-logo.svg"
              width={50}
              height={50}
              alt="DevOverflow"
            />

            <p className="cursor-pointer font-spaceGrotesk text-4xl font-bold text-gray-500 max-md:w-min">
              Dev <span className="text-primary-500">Overflow</span>
            </p>
          </Link>
          <p className="body-regular lg:paragraph-regular max-w-[75%] text-gray-700">
            DevOverflow is a complex Next.js 14 app that exhibits Q&A platform
            for developers to ask questions, share knowledge, and learn from
            each other.
          </p>
          <p className="base-semibold rounded-md bg-primary-500 px-3 py-2 text-gray-500 max-md:text-center">
            Creator -
            <span className="h2-bold ml-2 text-[#f9f7ff]">
              Rohit Kumar Suman
            </span>
          </p>
          {/* ⁡⁣⁢⁣Link to HomePage⁡ */}
          <div className="body-regular lg:paragraph-regular text-gray-700">
            Explore the
            <Link
              href="/home"
              className="h3-semibold mx-2 cursor-pointer capitalize text-primary-500 underline hover:text-gray-700"
            >
              Application
            </Link>
          </div>
        </div>
        {/* ⁡⁣⁢⁣More Projects Link⁡ */}
        <div className="flex-center w-full flex-col  gap-6">
          <div className="h3-semibold text-gray-500">More Projects By Me :</div>
          <ProjectLinks />
        </div>
        {/* ⁡⁣⁢⁣Social Links⁡ */}
        <div className="max-md:flex max-md:gap-4 md:absolute md:right-0 md:top-[35%]">
          {socialLinks.map((item) => (
            <Link
              key={item.imgURL}
              href={item.link}
              className="flex-center cursor-pointer flex-col rounded-sm bg-[#ffdada] px-2 py-1 md:my-2 md:pl-2"
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={30}
                height={30}
                className="my-1 object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default IntroPage;
