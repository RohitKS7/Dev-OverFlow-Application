"use client";
import { upvoteAnswer, downvoteAnswer } from "@/lib/actions/answer.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { formatBigNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved,
}: Props) => {
  const pathName = usePathname();
  const router = useRouter();

  const handleSave = () => {};

  const handleVote = async (action: string) => {
    // if user is not logged-in and trying to vote then return
    if (!userId) {
      console.error("Please log in to perform this action");
    }

    // If performed action is upvote
    if (action === "upvote") {
      // and If upvote action is performed on Question
      if (type === "Question") {
        await upvoteQuestion({
          questionId: itemId,
          userId,
          hasupVoted,
          hasdownVoted,
          path: pathName,
        });
      } else if (type === "Answer") {
        await upvoteAnswer({
          answerId: itemId,
          userId,
          hasupVoted,
          hasdownVoted,
          path: pathName,
        });
      }

      // exit from this function
      return;
    }

    // If performed action is downvote
    if (action === "downvote") {
      // and If downvote action is performed on Question
      if (type === "Question") {
        await downvoteQuestion({
          questionId: itemId,
          userId,
          hasupVoted,
          hasdownVoted,
          path: pathName,
        });
      } else if (type === "Answer") {
        await downvoteAnswer({
          answerId: itemId,
          userId,
          hasupVoted,
          hasdownVoted,
          path: pathName,
        });
      }

      // exit from this function
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        {/* UPVOTES */}
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasupVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            alt={hasupVoted ? "upvoted" : "upvote"}
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1 ">
            <p className="subtle-medium text-dark400_light900">
              {formatBigNumber(upvotes)}
            </p>
          </div>
        </div>

        {/* DOWNVOTES */}
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasdownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            alt={hasdownVoted ? "downvoted" : "downvote"}
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1 ">
            <p className="subtle-medium text-dark400_light900">
              {formatBigNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {/* SAVED */}
      {type === "Question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          alt={hasSaved ? "saved" : "save"}
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
