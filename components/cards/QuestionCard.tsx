import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { formatBigNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface QuestionProps {
  _id: number;
  title: string;
  tags: {
    _id: number;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}

const QuestionCard = ({
  clerkId,
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId; // only show Action Buttons if 'clerkId' exists and if 'clerkId' is equal to 'author.clerkId'

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      {/* ⁡⁣⁢⁣𝗛𝗘𝗔𝗗𝗜𝗡𝗚⁡ ⁡⁣⁢⁣𝗮𝗻𝗱 𝗖𝗿𝗲𝗮𝘁𝗲𝗱𝗔𝘁⁡  */}
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            {/* `line-clamp-1` this style will make this possible 'How to make div center aligned?' => 'How to make...' . Meaning it will hide the overflowed text in container when the space is not sufficient to render the entire sentence */}
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>

        {/* ⁡⁣⁣⁢𝘐𝘧 𝘴𝘪𝘨𝘯𝘦𝘥-𝘪𝘯 𝘢𝘥𝘥 𝘦𝘥𝘪𝘵 𝘥𝘦𝘭𝘦𝘵𝘦 𝘢𝘤𝘵𝘪𝘰𝘯𝘴⁡ */}
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      {/* ⁡⁣⁢⁣𝗧𝗮𝗴𝘀⁡ */}
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      {/* ⁡⁣⁢⁣𝗠𝗘𝗧𝗥𝗜𝗖𝗦⁡ */}
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />
        <div className="flex justify-end gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatBigNumber(upvotes.length)}
            title=" Votes "
            textStyles=" small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="Answers"
            value={formatBigNumber(answers.length)}
            title=" Answers "
            textStyles=" small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatBigNumber(views)}
            title=" views "
            textStyles=" small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
