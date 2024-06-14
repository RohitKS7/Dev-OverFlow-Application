"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import GlobalSearchResult from "./GlobalSearchResult";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null);

  // 𝘎𝘦𝘵 𝘘𝘶𝘦𝘳𝘺 𝘧𝘳𝘰𝘮 𝘵𝘩𝘦 𝘜𝘙𝘓 𝘸𝘪𝘵𝘩 𝘵𝘩𝘦 𝘩𝘦𝘭𝘱 𝘰𝘧 𝘴𝘦𝘢𝘳𝘤𝘩𝘗𝘢𝘳𝘢𝘮𝘴
  const query = searchParams.get("globalSearch");

  const [searchValue, setSearchValue] = useState(query || ""); // The initial state is query if there's a query that is.

  const [isOpen, setIsOpen] = useState(false); // To check if Search result's  UI is open or not

  // ⁡⁣⁢⁣𝗧𝗼 𝗖𝗹𝗼𝘀𝗲 𝘁𝗵𝗲 𝗠𝗼𝗱𝗮𝗹⁡ (search result UI) whenever user click outside of it
  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearchValue("");
      }
    };

    setIsOpen(false);

    document.addEventListener("click", handleOutSideClick);

    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, [pathname]);

  //  ⁡⁣⁢⁣𝗨𝗣𝗗𝗔𝗧𝗜𝗡𝗚 𝗔𝗡𝗗 𝗥𝗘𝗠𝗢𝗩𝗜𝗡𝗚 𝗤𝗨𝗘𝗥𝗬 𝗜𝗡 𝗨𝗥𝗟⁡
  useEffect(() => {
    // ⁡⁣⁢⁣𝗡𝗢𝗧𝗘⁡ : Never add ⁡⁣⁣⁢"call request"⁡(server call for data) on every ⁡⁣⁣⁢"KeyStoke Event"⁡
    // ⁡⁣⁣⁢USE⁡ Industry Tried and Tested⁡ ⁡⁣⁣⁢"⁡⁢⁣⁣Debounce⁡⁣⁣⁢"⁡⁡ method, in this we delay the execution of code
    const delayDebounceFn = setTimeout(() => {
      if (searchValue) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(), // append the URL values if there is any. such as : 'page', 'categeory'
          key: "globalSearch",
          value: searchValue,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["globalSearch", "type"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, pathname, router, searchParams, query]);

  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContainerRef}
    >
      <div className="relative flex min-h-[56px] grow items-center gap-1 rounded-xl bg-light-800 px-4 dark:bg-[linear-gradient(268deg,#f08080b0_0%,rgba(27,30,36,0.69)_100%)] ">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />

        <Input
          type="text"
          placeholder="Search globally"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);

            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          className="paragraph-regular placeholder text-dark400_light700  no-focus border-none bg-transparent shadow-none outline-none
          dark:placeholder:text-light-700"
        />
      </div>

      {isOpen && <GlobalSearchResult />}
    </div>
  );
};

export default GlobalSearch;
