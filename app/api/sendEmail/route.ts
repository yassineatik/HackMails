import { sendMail } from "@/lib/sendEmail";
import { NextResponse } from "next/server";
export const POST = async (req: Request, res: Response) => {
    const body = await req.json();
    console.log(body);
    const {
        subject,
        toEmail,
        otpText,
        host,
        port = 465,
        secure = true,
        user,
        pass,
        attachmentPath = null,
    } = body;
    try {
        await sendMail(
            subject,
            toEmail,
            otpText,
            host,
            port,
            secure,
            user,
            pass,
            attachmentPath
        );
        return NextResponse.json({ message: "Email sent" }, { status: 200 });
    } catch (err) {
        console.log("err from Route.ts", err);
        return NextResponse.json({ message: err }, { status: 500 });
    }
};
