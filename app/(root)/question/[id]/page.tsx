// "use client";

import { getQuestionById } from "@/lib/actions/question.action";
// import { useState, useEffect } from "react";

/* In a Next.js dynamic route like '/app/(root)/question/[id]', the `[id]` part indicates that this segment of the route is dynamic and can be replaced with different values when accessed. 

The `params` object in Next.js represents the dynamic parameters captured from the URL. In this case, it would contain an `id` property with the value specified in the URL.

The `searchParams` is not directly related to Next.js dynamic routing but is more commonly used with URLs in general. It represents the query parameters of a URL, which are the key-value pairs following the `?` in a URL. For example, in the URL '/app/(root)/question/[id]?sortBy=date', the `searchParams` would include `{ sortBy: 'date' }`. */

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

interface Params {
  id: string;
}

const Page = async ({ params }: { params: Params }) => {
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

  return (
    <div>
      {questionDetail ? (
        <div>
          <h1>{questionDetail.title}</h1>
          <p>{questionDetail.content}</p>
          {/* Render other question details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;
