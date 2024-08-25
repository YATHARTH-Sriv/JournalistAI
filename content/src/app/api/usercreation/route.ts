
import dbconnect from "@/lib/db/connect";
import UserModel from "@/lib/db/model/user.model";
import { NextRequest,NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
 try {
    await dbconnect()
    const {name,username,credits,email}= await req.json() 
    console.log(name,username,credits,email)
    const newuser=await UserModel.create({
        name,
        username,
        credits,
        email
    })
    
    return NextResponse.json({newuser}, { status: 200 });
 } catch (error) {
     return NextResponse.json({ error: "User could not be created" }, { status: 500 });
 }

}