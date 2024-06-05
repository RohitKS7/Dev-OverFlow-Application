"use client";
import { upvoteAnswer, downvoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatBigNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  const pathName = usePathname();
  const router = useRouter();

  // ⁡⁣⁢⁣Handle Save Question Function⁡
  const handleSave = async () => {
    await toggleSaveQuestion({
      userId,
      questionId: itemId,
      path: pathName,
    });

    return toast({
      title: `Question ${
        !hasSaved ? "saved in" : "removed from"
      } your collection`,
      variant: !hasSaved ? "default" : "destructive",
    });
  };

  // ⁡⁣⁢⁣Handle Vote Function⁡
  const handleVote = async (action: string) => {
    // 𝘪𝘧 𝘶𝘴𝘦𝘳 𝘪𝘴 𝘯𝘰𝘵 𝘭𝘰𝘨𝘨𝘦𝘥-𝘪𝘯 𝘢𝘯𝘥 𝘵𝘳𝘺𝘪𝘯𝘨 𝘵𝘰 𝘷𝘰𝘵𝘦 𝘵𝘩𝘦𝘯 𝘳𝘦𝘵𝘶𝘳𝘯
    if (!userId) {
      return toast({
        title: "Please log in",
        description: "You must be logged in to perform this action",
      });
    }

    // 𝘐𝘧 𝘱𝘦𝘳𝘧𝘰𝘳𝘮𝘦𝘥 𝘢𝘤𝘵𝘪𝘰𝘯 𝘪𝘴 ⁡⁣⁣⁢𝙪𝙥𝙫𝙤𝙩𝙚⁡
    if (action === "upvote") {
      // 𝘢𝘯𝘥 𝘐𝘧 𝘶𝘱𝘷𝘰𝘵𝘦 𝘢𝘤𝘵𝘪𝘰𝘯 𝘪𝘴 𝘱𝘦𝘳𝘧𝘰𝘳𝘮𝘦𝘥 𝘰𝘯 𝘘𝘶𝘦𝘴𝘵𝘪𝘰𝘯
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

      // ⁡⁢⁣⁢Toast⁡
      return toast({
        title: `Upvote ${!hasupVoted ? "Successfull" : "Removed"}`,
        variant: !hasupVoted ? "default" : "destructive",
      });
    }

    // 𝘐𝘧 𝘱𝘦𝘳𝘧𝘰𝘳𝘮𝘦𝘥 𝘢𝘤𝘵𝘪𝘰𝘯 𝘪𝘴 ⁡⁣⁣⁢𝙙𝙤𝙬𝙣𝙫𝙤𝙩𝙚⁡
    if (action === "downvote") {
      // 𝘢𝘯𝘥 𝘐𝘧 𝘥𝘰𝘸𝘯𝘷𝘰𝘵𝘦 𝘢𝘤𝘵𝘪𝘰𝘯 𝘪𝘴 𝘱𝘦𝘳𝘧𝘰𝘳𝘮𝘦𝘥 𝘰𝘯 𝘘𝘶𝘦𝘴𝘵𝘪𝘰𝘯
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

      // ⁡⁢⁣⁢Toast⁡
      return toast({
        title: `Downvote ${!hasdownVoted ? "Successfull" : "Removed"}`,
        variant: !hasdownVoted ? "default" : "destructive",
      });
    }
  };

  useEffect(() => {
    viewQuestion({
      questionId: itemId,
      userId: userId || undefined,
    });
  }, [itemId, userId, pathName, router]);

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        {/* ⁡⁣⁢⁣𝗨𝗣𝗩𝗢𝗧𝗘𝗦⁡ */}
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

        {/* ⁡⁣⁢⁣𝗗𝗢𝗪𝗡𝗩𝗢𝗧𝗘𝗦⁡ */}
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

      {/* ⁡⁣⁢⁣𝗦𝗔𝗩𝗘𝗗⁡ */}
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
