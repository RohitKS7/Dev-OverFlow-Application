"use client";
import { formatBigNumber } from "@/lib/utils";
import Image from "next/image";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpVoted: boolean;
  downvotes: number;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasUpVoted,
  downvotes,
  hasDownVoted,
  hasSaved,
}: Props) => {
  const handleSave = () => {};

  const handleVote = (action: string) => {};
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        {/* UPVOTES */}
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            alt={hasUpVoted ? "upvoted" : "upvote"}
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
              hasDownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            alt={hasDownVoted ? "downvoted" : "downvote"}
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
    </div>
  );
};

export default Votes;
