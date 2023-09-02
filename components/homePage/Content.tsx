import React, { useState } from 'react'
import {
    Collapse,
} from "@material-tailwind/react";
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from '../ui/button';
import axios from 'axios';
import { saveToDatabase, getSignature } from "../../app/_actions"
import GithubStar from './GithubStar';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import Done from '../../public/Done.json'
import EmailSetup from './EmailSetup';
import RecipientSetup from './RecipientSetup';
import SmtpSetup from './SmtpSetup';


function Content() {
    const [openSmtp, setOpenSmtp] = React.useState(true);
    const [openEmail, setOpenEmail] = React.useState(false);
    const [openEmailReceipts, setOpenEmailReceipts] = React.useState(false);
    const [server, setServer] = useState('');
    const [port, setPort]: any = useState(null);
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [ssl, setSsl] = useState(true);
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [attachment, setAttachment]: any = useState('');
    const [recipients, setRecipients] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [sentEmails, setSentEmails]: any = useState([]);
    const [failedEmails, setFailedEmails]: any = useState([]);

    const handleSubmit = async () => {
        setSentEmails([]);
        setFailedEmails([]);
        if (recipients.split('\n').length === 0) {
            toast.error('Please enter at least one recipient');
            setLoading(false);
            return;
        }
        for (let i = 0; i < recipients.split('\n').length; i++) {
            const element = recipients.split('\n')[i];
            if (element.split(':').length !== 2) {
                toast.error('Emails format must be like this: email:name');
                setLoading(false);
                return;
            }
        }
        if (!subject) {
            setLoading(false);
            toast.error('Please enter a subject');
            return;
        }
        setLoading(true);

        const combo = recipients.split('\n');
        for (let i = 0; i < combo.length; i++) {
            const element = combo[i];
            const email = element.split(':')[0];
            const name = element.split(':')[1];
            let updatedBody = body.replaceAll('{{name}}', name);
            await axios.post('/api/sendEmail', JSON.stringify(
                {
                    subject: subject,
                    toEmail: email,
                    otpText: updatedBody,
                    host: server,
                    port: port ? port : 465,
                    secure: ssl,
                    user: user,
                    pass: pass,
                    attachmentPath: attachment
                }
            )).then(res => {
                console.log('response', res);
                if (res.status === 200) {
                    setSentEmails([...sentEmails, email]);
                }
            }).catch(err => {
                setFailedEmails([...failedEmails, email]);
                console.log('error', err);
                if (err.response.data.message?.errno === -3008 || err.response.data.message?.errno === -3004) {
                    console.log('error');
                    toast.error('Please check your SMTP credentials');
                    i = combo.length;
                } else {
                    toast.error('An error occurred, Please check your SMTP credentials');
                }
            });
        }
        setLoading(false);
        setIsDone(true);
        setTimeout(() => {
            setIsDone(false);
        }, 5000);
    };

    const uploadFile = async (file: any) => {
        const { timestamp, signature }: any = await getSignature();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp);
        formData.append('folder', 'next');
        formData.append('resource_type', 'raw');
        const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL as string;
        const data = await fetch(endpoint, {
            method: 'POST',
            body: formData,
        }).then(res => res.json());

        const url = await saveToDatabase({
            public_id: data?.public_id,
            version: data?.version,
            signature: data?.signature,
        });
        setAttachment(url)
    }


    return (
        <div className='flex flex-col items-center justify-center w-full h-full gap-10 m-2 sm:m-4 md:m-6'>
            <GithubStar />
            <SmtpSetup
                open={openSmtp}
                onClick={() => {
                    setOpenSmtp(!openSmtp);
                    setOpenEmail(false);
                    setOpenEmailReceipts(false);
                }}
                server={server}
                port={port}
                user={user}
                pass={pass}
                ssl={ssl}
                setPort={setPort}
                setUser={setUser}
                setPass={setPass}
                setSsl={setSsl}
                setServer={setServer}
                setOpenEmail={setOpenEmail}
                setOpenSmtp={setOpenSmtp}
                setOpenEmailReceipts={setOpenEmailReceipts}
            />
            <EmailSetup
                open={openEmail}
                onClick={() => {
                    setOpenEmail(!openEmail);
                    setOpenSmtp(false);
                    setOpenEmailReceipts(false);
                }}
                subject={subject}
                setSubject={setSubject}
                body={body}
                setBody={setBody}
                uploadFile={uploadFile}
                setOpenEmail={setOpenEmail}
                setOpenSmtp={setOpenSmtp}
                setOpenEmailReceipts={setOpenEmailReceipts}
            />
            <RecipientSetup
                open={openEmailReceipts}
                onClick={() => {
                    setOpenSmtp(false);
                    setOpenEmail(false);
                    setOpenEmailReceipts(!openEmailReceipts);
                }}
                recipients={recipients}
                setRecipients={setRecipients}
                setOpenEmail={setOpenEmail}
                handleSubmit={handleSubmit}
                setOpenSmtp={setOpenSmtp}
                setOpenEmailReceipts={setOpenEmailReceipts}

            />
            {

                loading &&
                <div className='flex flex-col items-center justify-center'>
                    <Icon icon="tdesign:loading" className="animate-spin" fontSize={40} />
                    Sending emails ... ({sentEmails.length} / {recipients.split('\n').length})
                </div>

            }
            <div className={` flex-col items-center justify-center ${isDone ? 'flex' : 'hidden'}`}>
                <div className='flex flex-row items-center gap-3'>
                    <Lottie animationData={Done} loop={true} className='w-10 h-10' />
                    <p className='text-xl font-semibold'>Done !</p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-lg font-semibold'>Sent {sentEmails.length} emails</p>
                    <ul>
                        {
                            sentEmails.map((email: any) => {
                                return <li key={email}>{email}</li>
                            })
                        }
                    </ul>
                    <p className='text-lg font-semibold'>Failed {failedEmails.length} emails</p>
                </div>
            </div>
        </div>
    );
}

export default Content;
