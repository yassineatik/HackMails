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
            pass
        );
        return NextResponse.json({ message: "Email sent" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
};
