import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Your Question | Dev OverFlow",
  description:
    "Ask your question to get help from a community of 1,000,000+ developers. Ask Now! .",
};

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
      <h1 className="h1-bold text-gray500_light900">Ask a question</h1>
      <div className="mt-9">
        {/* Question is a Form component which is server - side */}
        <Question mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
