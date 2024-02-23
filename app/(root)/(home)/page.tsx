import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";

const questions = [
  {
    _id: 1,
    title: "How to make button gradient hover effect with tailwind CSS?",
    tags: [
      { _id: 1, name: "TailwindCSS" },
      { _id: 2, name: "CSS" },
      { _id: 3, name: "Animation" },
    ],
    author: {
      _id: "author_id_1",
      name: "Rohit Kumar",
      picture: "author_picture_url_1",
    },
    upvotes: 15e3,
    views: 1e8,
    answers: [],
    createdAt: new Date("2024-02-21T11:30:00.000Z"),
  },
  {
    _id: 2,
    title: "Difference between Array and Object?",
    tags: [
      { _id: 1, name: "JavaScript" },
      { _id: 2, name: "Logic" },
    ],
    author: {
      _id: "author_id_2",
      name: "Kumar Suman",
      picture: "author_picture_url_2",
    },
    upvotes: 15,
    views: 120,
    answers: [],
    createdAt: new Date("2024-02-01T15:54:00.000Z"),
  },
];

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

      {/* Question Card */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
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
    </>
  );
};

export default Home;
