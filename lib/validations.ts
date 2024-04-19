import { z } from "zod";

// ⁡⁣⁢⁣𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻 𝗙𝗼𝗿𝗺 𝗦𝗰𝗵𝗲𝗺𝗮⁡
export const QuestionsSchema = z.object({
  // * you can do custom messages too like this
  //  title: z.string().min(5, {message: "Wrong!!! Type"}).max(130),
  // But I'll go default message of Zod
  title: z.string().min(5).max(130),
  explanation: z.string().min(100),
  //  an array of string minimum item 1 & maximum 3. and each string(item) minimum characters 1 & maximum 15 characters
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

// ⁡⁣⁢⁣𝗔𝗻𝘀𝘄𝗲𝗿 𝗙𝗼𝗿𝗺 𝗦𝗰𝗵𝗲𝗺𝗮⁡
export const AnswerSchema = z.object({
  answer: z.string().min(100),
});

// ⁡⁣⁢⁣𝗘𝗱𝗶𝘁 𝗣𝗿𝗼𝗳𝗶𝗹𝗲 𝗙𝗼𝗿𝗺 𝗦𝗰𝗵𝗲𝗺𝗮⁡
export const ProfileSchema = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  portfolioWebsite: z.string().url(),
  location: z.string().min(5).max(50),
  bio: z.string().min(10).max(150),
});
