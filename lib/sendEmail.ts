var nodemailer = require("nodemailer");
var fs = require("fs");
//-----------------------------------------------------------------------------
export async function sendMail(
    subject: string,
    toEmail: string,
    otpText: string,
    host: string,
    port: number,
    secure: boolean,
    user: string,
    pass: string
) {
    var transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: secure,
        auth: {
            user: user,
            pass: pass,
        },
    });

    // var mailOptions = {
    //     from: user,
    //     to: toEmail,
    //     subject: subject,
    //     text: otpText,
    //     attachements: [
    //         {
    //             filename: "logo.png",
    //             path: "/public/logo.png",
    //             cid: "logo",
    //         },
    //     ],
    // };

    await new Promise((resolve, reject) => {
        transporter.sendMail(
            {
                from: user,
                to: toEmail,
                subject: subject,
                text: otpText,
                attachments: [
                    {
                        filename: "YassineAtik-FR.pdf",
                        path: "./public/YassineAtik-FR.pdf",
                    },
                ],
            },
            (err: any, response: any) => {
                if (err) {
                    console.log("err from sendMail.ts", err);
                    reject(err);
                } else {
                    console.log("response from sendMail.ts", response);
                    resolve(response);
                }
            }
        );
    });
}
