import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getTopPopularTags } from "@/lib/actions/tag.action";

const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getTopPopularTags();
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        {/* text-gray600_light900 */}
        <h3 className="h3-bold  primary-text-gradient relative text-center ">
          <span className="absolute -top-4 left-0 h-[2px] w-full bg-[#a8a29e]"></span>
          Top Questions
          <span className="absolute left-0 top-10 h-[2px] w-full bg-[#a8a29e]"></span>
        </h3>

        <div className="mt-12 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              key={question._id}
              href={`/question/${question._id}`}
              className="flex cursor-pointer items-center justify-between gap-7 "
            >
              <p className="body-medium text-gray700_light900 hover:text-primary-500 dark:hover:text-primary-500">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="h3-bold primary-text-gradient relative text-center">
          <span className="absolute -top-4 left-0 h-[2px] w-full bg-[#a8a29e]"></span>
          Popular Tags
          <span className="absolute left-0 top-10 h-[2px] w-full bg-[#a8a29e]"></span>
        </h3>
        <div className="mt-12 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.numberOfQuestions} // numberOfQuestions = based on the tag.action.ts function 'getTopPopularTags()'
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
