"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const { toast } = useToast();
  const pathName = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //  ⁡⁣⁢⁣ 𝗛𝗮𝗻𝗱𝗹𝗲 𝗘𝗱𝗶𝘁 𝗙𝘂𝗻𝗰𝘁𝗶𝗼𝗻⁡
  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };
  //   ⁡⁣⁢⁣𝗛𝗮𝗻𝗹𝗱𝗲 𝗗𝗲𝗹𝗲𝘁𝗲 𝗙𝘂𝗻𝗰𝘁𝗶𝗼𝗻⁡
  const handleDelete = async () => {
    setLoading(true); // Disable the button while the operation is in progress
    try {
      if (type === "Question") {
        // ⁡⁣⁣⁢𝘋𝘦𝘭𝘦𝘵𝘦 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯⁡
        await deleteQuestion({
          questionId: JSON.parse(itemId),
          path: pathName,
        });

        toast({
          title: "Question Deleted Successfully",
          variant: "destructive",
        });
      } else if (type === "Answer") {
        // ⁡⁣⁣⁢𝘋𝘦𝘭𝘦𝘵𝘦 𝘈𝘯𝘴𝘸𝘦𝘳⁡
        await deleteAnswer({ answerId: JSON.parse(itemId), path: pathName });

        toast({
          title: "Answer Deleted Successfully",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error deleting item:", error);
      toast({
        title: "Error deleting items",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Re-enable the button after the operation completed
    }
  };

  return (
    <HoverCard openDelay={0} closeDelay={1000000000}>
      <div className="flex items-center justify-end gap-3 max-sm:w-full">
        {type === "Question" && (
          <>
            <HoverCardTrigger className="w-10">
              <Image
                src="/assets/icons/edit.svg"
                alt="Edit Button"
                width={14}
                height={14}
                className="cursor-pointer object-contain"
                onClick={handleEdit}
              />
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-40 dark:bg-light-400 ">
              Edit Question
            </HoverCardContent>
          </>
        )}

        <Image
          src="/assets/icons/trash.svg"
          alt="Delete Button"
          width={14}
          height={14}
          className={`cursor-pointer object-contain ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={!loading ? handleDelete : undefined}
        />
      </div>
    </HoverCard>
  );
};

export default EditDeleteAction;
