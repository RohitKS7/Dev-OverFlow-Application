"use client";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 𝘎𝘦𝘵 𝘘𝘶𝘦𝘳𝘺 𝘧𝘳𝘰𝘮 𝘵𝘩𝘦 𝘜𝘙𝘓 𝘸𝘪𝘵𝘩 𝘵𝘩𝘦 𝘩𝘦𝘭𝘱 𝘰𝘧 𝘴𝘦𝘢𝘳𝘤𝘩𝘗𝘢𝘳𝘢𝘮𝘴
  const query = searchParams.get("search"); // "⁡⁢⁣⁣search⁡" is name of the query, you can use any name. [http://localhost:3000/?⁡⁣⁣⁢search⁡=⁡⁣⁢⁢react⁡] from this URL we'll get "⁡⁣⁢⁢react⁡"

  const [searchValue, setSearchValue] = useState(query || ""); // The initial state is query if there's a query that is.

  //  ⁡⁣⁢⁣𝗨𝗣𝗗𝗔𝗧𝗜𝗡𝗚 𝗔𝗡𝗗 𝗥𝗘𝗠𝗢𝗩𝗜𝗡𝗚 𝗤𝗨𝗘𝗥𝗬 𝗜𝗡 𝗨𝗥𝗟⁡
  useEffect(() => {
    // ⁡⁣⁢⁣𝗡𝗢𝗧𝗘⁡ : Never add ⁡⁣⁣⁢"call request"⁡(server call for data) on every ⁡⁣⁣⁢"KeyStoke Event"⁡
    // ⁡⁣⁣⁢USE⁡ Industry Tried and Tested⁡ ⁡⁣⁣⁢"⁡⁢⁣⁣Debounce⁡⁣⁣⁢"⁡⁡ method, in this we delay the execution of code
    const delayDebounceFn = setTimeout(() => {
      if (searchValue) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(), // append the URL values if there is any. such as : 'page', 'categeory'
          key: "search",
          value: searchValue,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["search"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, route, pathname, router, searchParams, query]);

  return (
    <div className="relative w-full ">
      <div
        className={`background-light800_darkgradient relative flex min-h-[56px] grow ${otherClasses} items-center gap-4 rounded-[10px] px-4`}
      >
        {/* We only wanna show this when Icon Position is on the left side */}
        {iconPosition === "left" && (
          <Image
            src={imgSrc}
            alt="search"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        )}

        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="paragraph-regular placeholder no-focus text-dark400_light700 border-none bg-transparent 
          shadow-none outline-none dark:placeholder:text-light-400"
        />

        {/* When we need icon on the right side */}
        {iconPosition === "right" && (
          <Image
            src={imgSrc}
            alt="search"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default LocalSearchbar;
