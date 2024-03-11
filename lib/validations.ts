import { z } from "zod";

// Building Question Form Schema
export const QuestionsSchema = z.object({
  // * you can do custom messages too like this
  //  title: z.string().min(5, {message: "Wrong!!! Type"}).max(130),
  // But I'll go default message of Zod
  title: z.string().min(5).max(130),
  explanation: z.string().min(100),
  //  an array of string minimum item 1 & maximum 3. and each string(item) minimum characters 1 & maximum 15 characters
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});
