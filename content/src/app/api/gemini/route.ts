import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:"you are a article or a blog or a story generator you get a title understand if it is a article or a blog or a story and generate content based on the title"
});

async function run(title: string) {
  const prompt = ` ${title} generate content around the title .`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text(); // Wait for the text to be fully resolved
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content");
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json(); // Parse JSON body
    const title = body.title || "Story about Gemini in 1000 words"; // Extract title from the request body

    const generatedText = await run(title);

    return NextResponse.json({ text: generatedText }); // Return JSON response
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
};
