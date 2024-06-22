import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";

import React from "react";

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: searchParams.page ? +searchParams.page : 1,
    searchQuery: searchParams.search,
  });

  return (
    <>
      {/* ⁡⁣⁢⁣𝗛𝗘𝗔𝗗𝗜𝗡𝗚⁡ */}
      <h1 className="h1-bold text-gray500_light900 uppercase">
        {" "}
        {result.tagTitle}{" "}
      </h1>

      {/* ⁡⁣⁢⁣𝗦𝗘𝗔𝗥𝗖𝗛⁡ */}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col md:flex-col">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tag questions"
          otherClasses="flex-1"
        />
      </div>

      {/* ⁡⁣⁢⁣𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻 𝗖𝗮𝗿𝗱⁡ */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {/* // Check if result exists and is an array before accessing its length property */}
        {result.tagRelatedQuestions.length > 0 ? (
          result.tagRelatedQuestions.map((question: any) => (
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
            title=" There are no tag question to show"
            description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the
  discussion. our query could be the next big thing others learn from. Get
  involved! 💡"
            link="/ask-question"
            linkText="Ask a Question"
          />
        )}
      </div>

      {/* ⁡⁣⁢⁣𝗣𝗮𝗴𝗶𝗻𝗮𝘁𝗶𝗼𝗻⁡ */}
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Page;
