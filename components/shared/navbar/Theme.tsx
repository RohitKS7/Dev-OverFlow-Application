"use client";

import { useTheme } from "@/context/ThemeProvider";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { themes } from "@/constants";

const Theme = () => {
  const { mode, setMode } = useTheme();

  return (
    <Menubar className="relative border-none bg-transparent shadow-none ">
      {/* menubar class optional => 'hover:bg-[#f4f6f8] dark:hover:bg-dark-400' */}
      <MenubarMenu>
        <MenubarTrigger className=" data-[state=open]:bg-light-900 dark:data-[state=open]:bg-dark-200 ">
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun-light"
              width={20}
              height={20}
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="moon-dark"
              width={20}
              height={20}
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute -right-12 mt-3 min-w-[120px] rounded border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300 ">
          {/* mapping over items */}
          {themes.map((item) => (
            <MenubarItem
              key={item.value}
              className="flex items-center gap-4 px-2.5 py-2 hover:bg-[#f4f6f8] dark:hover:bg-dark-400"
              onClick={() => {
                setMode(item.value);
                if (item.value !== "system") {
                  localStorage.theme = item.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <Image src={item.icon} alt={item.value} width={16} height={16} />
              <p
                className={`body-semibold text-light-500 ${
                  mode === item.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                } `}
              >
                {item.label}{" "}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
