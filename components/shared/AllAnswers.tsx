import React from "react";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Image from "next/image";
import ParseHTML from "./ParseHTML";
import Link from "next/link";
import { formatTimestamp } from "@/lib/utils";
import Votes from "./Votes";
import Pagination from "./Pagination";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  //!  ⁡⁣⁢⁣𝗙𝗲𝘁𝗰𝗵𝗶𝗻𝗴 𝗔𝗹𝗹 𝗔𝗻𝘀𝘄𝗲𝗿𝘀⁡
  //* 𝘋𝘰𝘯'𝘵 𝘧𝘰𝘳𝘨𝘦𝘵 𝘵𝘰 𝘱𝘢𝘳𝘴𝘦 𝘵𝘩𝘦 𝘴𝘵𝘳𝘪𝘯𝘨𝘪𝘧𝘪𝘦𝘥 𝘘𝘶𝘦𝘴𝘵𝘪𝘰𝘯𝘐𝘋, 𝘐 𝘨𝘰𝘵 𝘢𝘯 𝘦𝘳𝘳𝘰𝘳 𝘣𝘦𝘤𝘰𝘻 𝘰𝘧 𝘪𝘵 𝘢𝘯𝘥 𝘐 𝘸𝘢𝘴 𝘤𝘭𝘶𝘦𝘭𝘦𝘴𝘴 𝘧𝘰𝘳 𝘢𝘯 𝘩𝘰𝘶𝘳. 𝘚𝘰, 𝘥𝘰𝘯'𝘵 𝘳𝘦𝘱𝘦𝘢𝘵 𝘵𝘩𝘪𝘴 𝘮𝘪𝘴𝘵𝘢𝘬𝘦 𝘢𝘨𝘢𝘪𝘯 𝘢𝘯𝘥 𝘢𝘭𝘸𝘢𝘺𝘴 𝘗𝘢𝘳𝘴𝘦 𝘺𝘰𝘶𝘳 𝘚𝘵𝘳𝘪𝘯𝘨𝘪𝘧𝘪𝘦𝘥 𝘑𝘚𝘖𝘕 𝘥𝘢𝘵𝘢
  const answersList = await getAnswers({
    questionId: JSON.parse(questionId),
    page: page ? +page : 1, // `⁡⁣⁢⁣+` this plus will convert a string into number
    sortBy: filter,
  });

  return (
    <div className="mt-11">
      <div className="flex-between relative">
        <span className="text-dark100_light900 absolute -top-4 w-full border "></span>

        <h3 className="primary-text-gradient h3-semibold">
          {totalAnswers} Answers
        </h3>

        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {answersList.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 ">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1 max-sm:gap-2 sm:items-center"
              >
                <div className="relative size-[18px] overflow-hidden rounded-full">
                  <Image
                    fill
                    src={answer.author.picture}
                    alt="author picture"
                    className=" object-cover max-sm:mt-0.5"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700 ">
                    {answer.author.name}
                  </p>

                  <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1">
                    <span className="max-sm:hidden sm:ml-1"> - </span>
                    answered {formatTimestamp(answer.createdAt)}
                  </p>
                </div>
              </Link>
              <div className="flex justify-end">
                <Votes
                  type="Answer"
                  itemId={answer.id}
                  userId={userId}
                  upvotes={answer.upvotes.length}
                  hasupVoted={answer.upvotes.includes(userId)}
                  downvotes={answer.downvotes.length}
                  hasdownVoted={answer.downvotes.includes(userId)}
                />
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>

      {/* ⁡⁣⁢⁣𝗣𝗮𝗴𝗶𝗻𝗮𝘁𝗶𝗼𝗻⁡ */}
      <div className="mt-10">
        <Pagination pageNumber={page ? +page : 1} isNext={answersList.isNext} />
      </div>
    </div>
  );
};

export default AllAnswers;
