"use client";

import { sidebarLinks } from "@/constants";
import { useAuth, SignedOut } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

// ⁡⁣⁢⁣  𝗦𝗺𝗮𝗹𝗹𝗲𝗿 𝗖𝗼𝗺𝗽𝗼𝗻𝗲𝗻𝘁⁡
const NavContent = () => {
  const { userId } = useAuth();
  const pathName = usePathname();

  return (
    <div className="flex flex-1 flex-col gap-6 ">
      {/* use parenthesis in map like this `map(() => ())` to immediately return something and Currently used map is function type map which will return something after the runs through the function */}
      {sidebarLinks.map((item) => {
        const isActive =
          (pathName.includes(item.route) && item.route.length > 1) ||
          pathName === item.route;

        //  𝘐𝘧 𝘶𝘴𝘦𝘳𝘐𝘥 𝘦𝘹𝘪𝘴𝘵 𝘵𝘩𝘦𝘯 𝘋𝘪𝘳𝘦𝘤𝘵 𝘵𝘩𝘦𝘮 𝘵𝘰 𝘱𝘳𝘰𝘧𝘪𝘭𝘦 𝘥𝘦𝘵𝘢𝘪𝘭𝘴 𝘱𝘢𝘨𝘦
        if (item.route === "/profile") {
          if (userId) {
            // 𝘵𝘢𝘬𝘦 𝘵𝘩𝘦 𝘤𝘶𝘳𝘳𝘦𝘯𝘵 𝘳𝘰𝘶𝘵𝘦 𝘢𝘯𝘥 𝘢𝘥𝘥 𝘶𝘴𝘦𝘳𝘐𝘥 𝘵𝘰 𝘪𝘵
            item.route = `${item.route}/${userId}`;
          } else {
            return null;
          }
        }

        return (
          <Link
            key={item.route}
            href={item.route}
            className={`${
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-gray700_light900"
            } flex-start gap-4 rounded-lg bg-transparent p-4 hover:bg-[#f4f6f8] dark:hover:bg-dark-400`}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              className={`${isActive ? "" : "invert-colors"}`}
              width={20}
              height={20}
            />
            <p
              className={`${
                isActive ? "base-bold" : "base-medium"
              } max-lg:hidden`}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

//  ⁡⁣⁢⁣ 𝗠𝗮𝗶𝗻 𝗖𝗼𝗺𝗽𝗼𝗻𝗲𝗻𝘁⁡
const LeftSidebar = () => {
  return (
    <section
      className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-fit flex-col justify-between  overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] 
    "
    >
      <NavContent />

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 ">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                className="invert-colors lg:hidden"
                width={20}
                height={20}
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary text-gray700_light900 min-h-[41px]  w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                className="invert-colors lg:hidden"
                width={20}
                height={20}
              />
              <span className="max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
