import Email from "@/app/email/email";
import { NextRequest,NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_EMAIL_KEY);

export const POST = async (req:NextRequest) => {
//  const name=await req.json() 
 try {
    const {name,email}=await req.json()
    console.log(name,email)
     const { data, error } = await resend.emails.send({
     from: 'onboarding@resend.dev',
     to: `${email}`,
     subject: 'Welcome to journalist ai',
     react: Email({name}),
      })
      return NextResponse.json({data}, { status: 200 });
 } catch (error) {
     return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
 }

}