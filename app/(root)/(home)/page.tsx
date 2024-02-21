import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      {/* HEADING and BUTTON */}
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900"> All Questions</h1>

        <Link href="/ask-question" className=" flex justify-end max-sm:w-full">
          {/* exlaimation mark "!" is used to tell ShadCN,that this style is important */}
          <Button className="hover:hover-primary-gradient primary-gradient min-h-[46px] px-4 py-3 !text-light-900  ">
            Ask a Question
          </Button>
        </Link>
      </div>

      {/* SEARCH and FILTER */}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col md:flex-col">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          // HomePageFilters coming from `constant/filter.ts`
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />
    </>
  );
};

export default Home;
