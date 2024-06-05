import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const { question } = await request.json();

    // Ensure the question is defined and a string
    if (!question || typeof question !== "string") {
      throw new Error("Invalid question format");
    }

    const url = "https://chat-gpt26.p.rapidapi.com/";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY, // Use an environment variable for security
        "X-RapidAPI-Host": "chat-gpt26.p.rapidapi.com",
      },
      body: JSON.stringify({
        model: "gpt-4-1106-preview",
        messages: [
          {
            role: "system",
            content:
              "You are a knowledgeable assistant that provides quality information",
          },
          {
            role: "user",
            content: `Tell me ${question}`,
          },
        ],
      }),
    };

    // @ts-ignore
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`RapidAPI error: ${response.statusText}`);
    }

    const responseData = await response.json();

    // Ensure the response structure matches what you expect
    if (!responseData.choices || !responseData.choices.length) {
      throw new Error("Unexpected RapidAPI response format");
    }

    const reply = responseData.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Error in POST /api/chatgpt:", error);
    return NextResponse.json({ error: error.message });
  }
};
