import Question from "@/components/forms/Question";
import React from "react";

// This page is gonna be server-side, but how can it be? when the entire page is a form (user interactive).
// The Question component is 'client-side'
const AskQuestion = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question />
      </div>
    </div>
  );
};

export default AskQuestion;
