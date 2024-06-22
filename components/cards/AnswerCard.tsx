import Link from "next/link";
import Metric from "../shared/Metric";
import { formatBigNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface Props {
  clerkId?: string | null;
  _id: number;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId; // only show Action Buttons if 'clerkId' exists and if 'clerkId' is equal to 'author.clerkId'

  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="card-wrapper rounded-[10px] px-11 py-9 md:mb-8"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <div>
            <span className="subtle-regular  text-gray700_light700 line-clamp-1 flex sm:hidden">
              {getTimestamp(createdAt)}
            </span>

            <h3 className="sm:h3-semibold base-semibold text-gray600_light900 line-clamp-1 flex-1">
              {question.title}
            </h3>
          </div>
        </div>

        {/* ⁡⁣⁣⁢𝘐𝘧 𝘴𝘪𝘨𝘯𝘦𝘥-𝘪𝘯 𝘢𝘥𝘥 𝘦𝘥𝘪𝘵 𝘥𝘦𝘭𝘦𝘵𝘦 𝘢𝘤𝘵𝘪𝘰𝘯𝘴⁡ */}
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      {/* ⁡⁣⁢⁣𝗠𝗘𝗧𝗥𝗜𝗖⁡ */}
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user avatar"
          value={author.name}
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          isAuthor
          textStyles="body-medium text-gray700_light700"
        />
        <div className="flex justify-end gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatBigNumber(upvotes)}
            title=" Votes "
            textStyles=" small-medium text-gray700_light800"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
