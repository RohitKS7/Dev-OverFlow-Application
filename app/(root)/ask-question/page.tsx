import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

// This page is gonna be server-side, but how can it be? when the entire page is a form (user interactive).
// The Question component is 'client-side'
const AskQuestion = async () => {
  // !  Get the current userID from the clerk
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  // !  Pass the userId to User Server-action
  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
