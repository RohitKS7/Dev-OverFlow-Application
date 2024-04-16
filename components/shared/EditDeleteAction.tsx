"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
}
const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathName = usePathname();
  const router = useRouter();

  //  ⁡⁣⁢⁣ 𝗛𝗮𝗻𝗱𝗹𝗲 𝗘𝗱𝗶𝘁 𝗙𝘂𝗻𝗰𝘁𝗶𝗼𝗻⁡
  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };
  //   ⁡⁣⁢⁣𝗛𝗮𝗻𝗹𝗱𝗲 𝗗𝗲𝗹𝗲𝘁𝗲 𝗙𝘂𝗻𝗰𝘁𝗶𝗼𝗻⁡
  const handleDelete = async () => {
    if (type === "Question") {
      // ⁡⁣⁣⁢𝘋𝘦𝘭𝘦𝘵𝘦 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯⁡
      await deleteQuestion({ questionId: JSON.parse(itemId), path: pathName });
    } else if (type === "Answer") {
      // ⁡⁣⁣⁢𝘋𝘦𝘭𝘦𝘵𝘦 𝘈𝘯𝘴𝘸𝘦𝘳⁡
      await deleteAnswer({ answerId: JSON.parse(itemId), path: pathName });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "Question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit Button"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}

      <Image
        src="/assets/icons/trash.svg"
        alt="Delete Button"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
