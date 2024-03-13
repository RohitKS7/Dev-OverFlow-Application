import React from "react";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Image from "next/image";
import ParseHTML from "./ParseHTML";
import Link from "next/link";
import { formatTimestamp } from "@/lib/utils";
import Votes from "./Votes";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  //!  Fetching All Answers
  //* Don't forget to parse the stringified QuestionID, I got an error becoz of it and I was clueless for an hour. So, don't repeat this mistake again and always Parse your Stringified JSON data
  const answersList = await getAnswers({
    questionId: JSON.parse(questionId),
  });

  return (
    <div className="mt-11">
      <div className="flex-between ">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>

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
                <Image
                  src={answer.author.picture}
                  alt="author picture"
                  width={18}
                  height={18}
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
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
    </div>
  );
};

export default AllAnswers;
