import { NextRequest } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see our Getting Started tutorial)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function POST(req:NextRequest){
   const {knowldege}=await req.json()
   const model = genAI.getGenerativeModel({ model: "text-embedding-004"});
   const text = `${knowldege}`;

   const result = await model.embedContent(text);
   const embedding = result.embedding;
   console.log(embedding.values);
   

}