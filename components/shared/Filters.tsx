import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Badge } from "../ui/badge";

const filter = [
  { key: 1, value: "Newest" },
  { key: 1, value: "Recommended" },

  { key: 1, value: "Frequent" },

  { key: 1, value: "Unanswered" },
];
const Filters = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="md:hidden">
        <Select>
          <SelectTrigger className="min-h-[56px] max-sm:w-full sm:w-[180px] ">
            <SelectValue placeholder="Select a Filter" />
          </SelectTrigger>
          <SelectContent>
            {filter.map((filter) => (
              <SelectItem key={filter.key} value={filter.value}>
                {filter.value}{" "}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-5 max-md:hidden">
        {filter.map((filter) => (
          <Link href={`/`} key={filter.key}>
            <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
              <span>{filter.value} </span>
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Filters;
