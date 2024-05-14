"use client";
import { HomePageFilters } from "@/constants/filters";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState("");

  //  ⁡⁣⁢⁣⁡⁣⁢⁣𝗨𝗣𝗗𝗔𝗧𝗜𝗡𝗚 𝗔𝗡𝗗 𝗥𝗘𝗠𝗢𝗩𝗜𝗡𝗚 𝗙𝗜𝗟𝗧𝗘𝗥 𝗜𝗡 𝗨𝗥𝗟⁡
  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      // 𝘐𝘧 𝘢𝘤𝘵𝘪𝘷𝘦 𝘪𝘴 𝘢𝘭𝘳𝘦𝘢𝘥𝘺 𝘴𝘦𝘵 𝘵𝘰 𝘪𝘵𝘦𝘮 𝘵𝘩𝘦𝘯 𝘸𝘦 𝘩𝘢𝘷𝘦 𝘵𝘰 𝘶𝘯𝘵𝘰𝘨𝘨𝘭𝘦(𝘶𝘯𝘴𝘦𝘵) 𝘪𝘵.
      const newUrl = formUrlQuery({
        params: searchParams.toString(), // 𝘢𝘱𝘱𝘦𝘯𝘥 𝘵𝘩𝘦 𝘜𝘙𝘓 𝘷𝘢𝘭𝘶𝘦𝘴 𝘪𝘧 𝘵𝘩𝘦𝘳𝘦 𝘪𝘴 𝘢𝘯𝘺. 𝘴𝘶𝘤𝘩 𝘢𝘴 : '𝘱𝘢𝘨𝘦', '𝘤𝘢𝘵𝘦𝘨𝘦𝘰𝘳𝘺'
        key: "filter",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      // 𝘦𝘭𝘴𝘦 𝘚𝘦𝘵 𝘪𝘵 𝘵𝘰 𝘢𝘤𝘵𝘪𝘷𝘦
      const newUrl = formUrlQuery({
        params: searchParams.toString(), // 𝘢𝘱𝘱𝘦𝘯𝘥 𝘵𝘩𝘦 𝘜𝘙𝘓 𝘷𝘢𝘭𝘶𝘦𝘴 𝘪𝘧 𝘵𝘩𝘦𝘳𝘦 𝘪𝘴 𝘢𝘯𝘺. 𝘴𝘶𝘤𝘩 𝘢𝘴 : '𝘱𝘢𝘨𝘦', '𝘤𝘢𝘵𝘦𝘨𝘦𝘰𝘳𝘺'
        key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => handleTypeClick(item.value)}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300  dark:hover:bg-dark-400"
          }`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
