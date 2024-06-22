import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import React from "react";
import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Home | Dev OverFlow",
  description:
    "HomePage of Dev Overflow showing Questions of community of 1,000,000+ developers. Join us.",
};

const Home = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();
  // !  𝘍𝘦𝘵𝘤𝘩𝘪𝘯𝘨 𝘵𝘩𝘦 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯s 𝘧𝘳𝘰𝘮 𝘥𝘢𝘵𝘢𝘣𝘢𝘴𝘦
  let result;

  if (searchParams?.filter === "recommended") {
    if (userId) {
      result = await getRecommendedQuestions({
        userId,
        searchQuery: searchParams.search,
        page: searchParams.page ? +searchParams.page : 1,
      });
    } else {
      result = {
        questions: [],
        isNext: false,
      };
    }
  } else {
    result = await getQuestions({
      searchQuery: searchParams.search,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
    });
  }

  return (
    <>
      {/* ⁡⁣⁢⁣𝗛𝗘𝗔𝗗𝗜𝗡𝗚 𝗮𝗻𝗱 𝗕𝗨𝗧𝗧𝗢𝗡⁡ */}
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-gray500_light900 "> All Questions</h1>

        <Link href="/ask-question" className=" flex justify-end max-sm:w-full">
          {/* exlaimation mark "!" is used to tell ShadCN,that this style is important */}
          <Button className="primary-gradient hover:hover-primary-gradient min-h-[46px] px-4 py-3 !text-light-900  ">
            Ask a Question
          </Button>
        </Link>
      </div>

      {/* ⁡⁣⁢⁣𝗦𝗘𝗔𝗥𝗖𝗛 𝗮𝗻𝗱 𝗙𝗜𝗟𝗧𝗘𝗥⁡ */}
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

      {/* ⁡⁣⁢⁣𝗙𝗶𝗹𝘁𝗲𝗿𝘀 𝗳𝗼𝗿 𝗹𝗮𝗿𝗴𝗲 𝘀𝗰𝗿𝗲𝗲𝗻⁡  */}
      <HomeFilters />

      {/* ⁡⁣⁢⁣𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻 𝗖𝗮𝗿𝗱⁡ */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title=" There are no question to show"
            description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
            link="/ask-question"
            linkText="Ask a Question"
          />
        )}
      </div>

      {/* ⁡⁣⁢⁣𝗣𝗮𝗴𝗶𝗻𝗮𝘁𝗶𝗼𝗻⁡ */}
      <div className="mt-10 ">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1} // this ⁡⁣⁢⁣'𝗣𝗹𝘂𝘀'`+`⁡ symbol will convert a string into number
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Home;
