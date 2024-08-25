
import axios from "axios";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
   model: "gemini-1.5-flash",
   systemInstruction:"you are a article or a blog or a story generator you get a image analye it generate content based on the image a story or defininig the image" 
  });

async function fetchImageAsBase64(url: string) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const mimeType = response.headers['content-type'] || 'image/jpeg'; // Default to image/jpeg if MIME type is not provided
    const base64 = Buffer.from(response.data).toString("base64");
    return { data: base64, mimeType };
  } catch (error) {
    console.error("Error fetching image:", error);
    throw new Error("Error fetching image");
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }
    console.log(url);

    const { data: base64Data, mimeType } = await fetchImageAsBase64(url);

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType,
      },
    };

    const prompt = "Describe this image write a story around the idea understood from the image";
    const result = await model.generateContent([prompt, imagePart]);

    return NextResponse.json(result.response.text());
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Error processing request" }, { status: 500 });
  }
}
