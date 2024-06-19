import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags | Dev OverFlow",
  description: "Search across 1M+ tags for your prefered question..",
};

const Tags = async ({ searchParams }: SearchParamsProps) => {
  //!  ⁡⁣⁢⁣𝗙𝗲𝘁𝗰𝗵 𝗔𝗹𝗹 𝗧𝗮𝗴𝘀⁡
  const tagsList = await getAllTags({
    searchQuery: searchParams.search,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {/* ⁡⁣⁢⁣𝗛𝗘𝗔𝗗𝗜𝗡𝗚⁡ */}
      <h1 className="h1-bold text-gray500_light900"> Tags </h1>

      {/* ⁡⁣⁢⁣𝗦𝗘𝗔𝗥𝗖𝗛 𝗮𝗻𝗱 𝗙𝗜𝗟𝗧𝗘𝗥⁡ */}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col ">
        <LocalSearchbar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tag name"
          otherClasses="flex-1"
        />

        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {tagsList.tags.length > 0 ? (
          tagsList.tags.map((tag) => (
            //   <TagCard key={tag._id} tag={tag} />
            <Link
              key={tag._id}
              href={`/tags/${tag._id}`}
              className="shadow-light200_darknone"
            >
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                  <p className="paragraph-semibold text-gray700_light900">
                    {tag.name}
                  </p>
                </div>
                <p className="small-regular text-gray600_light700 mt-4">
                  JavaScript is a versatile, high-level programming language
                  primarily used for web development. It enables interactive web
                  pages and dynamic content through client-side scripting.
                  {/* {tag.description} */}
                </p>
                <p className="small-medium text-gray700_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length} +
                  </span>
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags found."
            link="/ask-question"
            linkText="Ask a question"
          />
        )}
      </section>

      {/* ⁡⁣⁢⁣𝗣𝗮𝗴𝗶𝗻𝗮𝘁𝗶𝗼𝗻⁡ */}
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={tagsList.isNext}
        />
      </div>
    </>
  );
};

export default Tags;
