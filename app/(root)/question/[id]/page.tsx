import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatBigNumber, getTimestamp } from "@/lib/utils";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dev OverFlow | Question",
  description: "Dev Overflow is a community of 1,000,000+ developers. Join us.",
};

// interface QuestionProps {
//   _id: string;
//   title: string;
//   content: string;
//   tags: { _id: string; name: string }[];
//   views: number;
//   upvotes: any[]; // Change to specific type if possible
//   downvotes: any[]; // Change to specific type if possible
//   author: {
//     _id: string;
//     clerkId: string;
//     name: string;
//     picture: string;
//   };
//   answers: any[]; // Change to specific type if possible
//   createdAt: Date;
//   __v: number;
// }

const Page = async ({ params, searchParams }: URLProps) => {
  //! There is some sort of bug which I'm unable to decipher right now which is causing this error
  //* RangeError: Maximum call stack size exceeded At String.replace (<anonymous>)
  // TODO: Try to make the code work properly until then i'm using different method of data fetching
  // const [questionDetail, setQuestionDetail] = useState<QuestionProps | null>(
  //   null
  // );
  // useEffect(() => {
  //   const fetchQuestion = async () => {
  //     try {
  //       const data = await getQuestionById({questionId: params.id});
  //       console.log("Question fetched successfully:", data);
  //       setQuestionDetail(data);
  //     } catch (error) {
  //       console.error("Error fetching question:", error);
  //     }
  //   };

  //   fetchQuestion();
  // }, [params.id]);

  const questionDetail = await getQuestionById({ questionId: params.id });

  const { userId: clerkId } = auth();
  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  console.log(mongoUser);

  //*  Object Destructing
  const {
    _id: _questionId,
    title,
    content,
    tags,
    views,
    upvotes,
    downvotes,
    author,
    answers,
    createdAt,
  } = questionDetail;

  const {
    clerkId: authorClerkId,
    name: authorName,
    picture: authorPicture,
  } = author;

  return (
    <>
      {/* TITLE AND AUTHOR */}
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${authorClerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <div className="relative size-[20px] overflow-hidden rounded-full">
              <Image
                fill
                src={authorPicture}
                alt="profile"
                className="object-cover"
              />
            </div>
            <p className="paragraph-semibold text-gray700_light700">
              {authorName}
            </p>
          </Link>
          <div className="flex justify-end">
            {/* VOTING FUNCTIONALITY */}
            {/* 
            1. `type` = To distinguish between question and answer Voting System since both have one.
            2. `itemId` = Id of the item based on it's Voting System. In this case, questionId for question Voting system
            3. `userId` = User who will upvote.
            4. `hasUpVoted` = Checking if the current User has UpVoted this article? 
            
            */}
            <Votes
              type="Question"
              itemId={_questionId}
              userId={mongoUser?._id}
              upvotes={upvotes.length}
              hasupVoted={upvotes.includes(mongoUser?._id)}
              downvotes={downvotes.length}
              hasdownVoted={downvotes.includes(mongoUser?._id)}
              hasSaved={mongoUser?.saved.includes(_questionId)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-gray600_light900 mt-3.5 w-full text-left">
          {title}
        </h2>
      </div>

      {/* METRICS */}
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(createdAt)}`}
          title="."
          textStyles=" small-medium text-gray700_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Answers"
          value={formatBigNumber(answers.length)}
          title=" Answers "
          textStyles=" small-medium text-gray700_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatBigNumber(views)}
          title=" views "
          textStyles=" small-medium text-gray700_light800"
        />
      </div>

      {/* QUESTION DESCRIPTION */}
      <ParseHTML data={content} />

      {/* TAGS */}
      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      {/* RENDER ANSWERS COMPONENT */}
      <AllAnswers
        questionId={JSON.stringify(_questionId)}
        userId={mongoUser?._id}
        totalAnswers={answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />

      {/* RENDER ANSWER FORM */}
      <Answer
        question={content}
        questionId={JSON.stringify(_questionId)}
        authorId={mongoUser?._id}
      />
    </>
  );
};

export default Page;
