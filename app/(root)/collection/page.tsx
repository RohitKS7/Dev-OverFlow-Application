import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

const CollectionPage = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const result = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.search,
  });

  return (
    <>
      {/* ⁡⁣⁢⁣𝗛𝗘𝗔𝗗𝗜𝗡𝗚⁡ */}

      <h1 className="h1-bold text-dark100_light900"> Your Collection </h1>

      {/* ⁡⁣⁢⁣𝗦𝗘𝗔𝗥𝗖𝗛 and 𝗙𝗜𝗟𝗧𝗘𝗥⁡ */}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col md:flex-col">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      {/* ⁡⁣⁢⁣𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻 𝗖𝗮𝗿𝗱⁡ */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {/* // Check if result exists and is an array before accessing its length property */}
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
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
          // Render NoResult component if there are no questions or result doesn't exist
          <NoResult
            title=" There are no saved question to show"
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

export default CollectionPage;
