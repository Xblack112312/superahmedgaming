import ConnectDB from "@/lib/ConnectDB";
import Application from "@/models/Application";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const { realname, discordname, age, email, phonenumber, time } = await request.json()

    try {
        
        await ConnectDB()

        if (!realname || !discordname || !age || !email || !phonenumber || !time) {
            return NextResponse.json({ success: false, message: "Missing Details." },  { status: 404 })
        }

        const application = new Application({
                realname: realname,
                discordname: discordname,
                age: age,
                email: email,
                phonenumber: phonenumber,
                time: time
        })

        await application.save()

        return NextResponse.json({ success: true, message: "Data Sent it Successfully" }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Application falied to send, please try again" }, { status: 502 })
    }
}