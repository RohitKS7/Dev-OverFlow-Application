"use client";

import { GlobalSearchFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get("type");

  const [active, setActive] = useState(typeParams || "");

  const handleTypeClick = (type: string) => {
    if (active === type) {
      setActive("");
      // 𝘐𝘧 𝘢𝘤𝘵𝘪𝘷𝘦 𝘪𝘴 𝘢𝘭𝘳𝘦𝘢𝘥𝘺 𝘴𝘦𝘵 𝘵𝘰 type 𝘵𝘩𝘦𝘯 𝘸𝘦 𝘩𝘢𝘷𝘦 𝘵𝘰 𝘶𝘯𝘵𝘰𝘨𝘨𝘭𝘦(𝘶𝘯𝘴𝘦𝘵) 𝘪𝘵.
      const newUrl = formUrlQuery({
        params: searchParams.toString(), // 𝘢𝘱𝘱𝘦𝘯𝘥 𝘵𝘩𝘦 𝘜𝘙𝘓 𝘷𝘢𝘭𝘶𝘦𝘴 𝘪𝘧 𝘵𝘩𝘦𝘳𝘦 𝘪𝘴 𝘢𝘯𝘺. 𝘴𝘶𝘤𝘩 𝘢𝘴 : '𝘱𝘢𝘨𝘦', '𝘤𝘢𝘵𝘦𝘨𝘦𝘰𝘳𝘺'
        key: "type",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(type);
      // 𝘦𝘭𝘴𝘦 𝘚𝘦𝘵 𝘪𝘵 𝘵𝘰 𝘢𝘤𝘵𝘪𝘷𝘦
      const newUrl = formUrlQuery({
        params: searchParams.toString(), // 𝘢𝘱𝘱𝘦𝘯𝘥 𝘵𝘩𝘦 𝘜𝘙𝘓 𝘷𝘢𝘭𝘶𝘦𝘴 𝘪𝘧 𝘵𝘩𝘦𝘳𝘦 𝘪𝘴 𝘢𝘯𝘺. 𝘴𝘶𝘤𝘩 𝘢𝘴 : '𝘱𝘢𝘨𝘦', '𝘤𝘢𝘵𝘦𝘨𝘦𝘰𝘳𝘺'
        key: "type",
        value: type.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-gray700_light900 body-medium">Type: </p>
      <div className="flex gap-3">
        {GlobalSearchFilters?.map((item) => (
          <button
            type="button"
            key={item.value}
            onClick={() => handleTypeClick(item.value)}
            className={`light-border-2 small-medium rounded-2xl px-5 py-2 capitalize dark:text-light-800  ${
              active === item.value
                ? "bg-primary-500 text-light-900"
                : "background-light700_dark500 text-dark-400 hover:text-primary-500 dark:hover:text-primary-500"
            } `}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
