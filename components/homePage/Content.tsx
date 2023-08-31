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

const Content = () => {
    const [openSmtp, setOpenSmtp] = React.useState(true);
    const [openEmail, setOpenEmail] = React.useState(false);
    const [openEmailReceipts, setOpenEmailReceipts] = React.useState(false);
    const [server, setServer] = useState('')
    const [port, setPort]: any = useState(null)
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [ssl, setSsl] = useState(true)
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    const [attachment, setAttachment]: any = useState('')
    const [recipients, setRecipients] = useState('')
    const [loading, setLoading] = useState(false)
    const [isDone, setIsDone] = useState(false)

    const [sentEmails, setSentEmails]: any = useState([])

    const handleSubmit = async () => {
        // check if the emails are valid
        if (recipients.split('\n').length == 0) {
            alert('Please enter at least one email')
            setLoading(false)
            return
        }
        // check if emails format is valid
        for (let i = 0; i < recipients.split('\n').length; i++) {
            const element = recipients.split('\n')[i];
            if (element.split(':').length != 2) {
                alert('Please enter a valid email format')
                setLoading(false)
                return
            }
        }
        if (subject == '') {
            setLoading(false)
            alert('Please enter a subject')
            return
        }
        setLoading(true)

        const combo = recipients.split('\n')
        for (let i = 0; i < combo.length; i++) {
            const element = combo[i];
            const email = element.split(':')[0]
            const name = element.split(':')[1]
            let updatedBody = body.replaceAll('{{name}}', name)
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
                console.log('response', res)
                if (res.status == 200) {
                    setSentEmails([...sentEmails, email])
                }
            }).catch(err => {
                console.log('waaaaaaaaa', err)
                if (err.response.data.message?.errno == -3008 || err.response.data.message?.errno == -3004) {
                    console.log('error')
                    toast.error('Please check your SMTP credentials')
                    i = combo.length
                } else {
                    toast.error('An error occured , please try again')
                }
            })
        }
        setLoading(false)
        setIsDone(true)
    }

    const uploadFile = async (file: any) => {
        const { timestamp, signature }: any = await getSignature();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp);
        formData.append('folder', 'next');

        const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL as string;

        // Add the resource type "raw" to the formData
        formData.append('resource_type', 'raw');

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
        <div className='flex flex-col items-center justify-center w-full h-full gap-10 m-6'>
            <GithubStar />
            <div className='w-[50%] overflow-hidden  shadow-xl border-2 flex flex-col border-gray-900 m-auto py-5 px-4 rounded-md '>
                <div className='flex flex-row items-center justify-between w-full cursor-pointer ' onClick={
                    () => {
                        setOpenSmtp(!openSmtp)
                        setOpenEmail(false)
                        setOpenEmailReceipts(false)
                    }
                }>
                    <h2 className='text-xl font-semibold'>Set up your SMTP</h2>
                    <Icon icon="iconamoon:arrow-down-2-light" className={`${openSmtp ?
                        'transform rotate-180 transition-transform duration-500' :
                        'transform rotate-0 transition-transform duration-500'
                        }`}
                        fontSize={32} />
                </div>
                <Collapse open={openSmtp}>
                    <form onSubmit={(e) => { e.preventDefault() }}
                        className='flex flex-col items-center justify-center w-full gap-3 mt-4'>
                        <div className='flex flex-row items-start justify-between w-full gap-4'>

                            <div className='flex flex-col items-start justify-center w-full'>
                                <label className='font-medium text-md'>SMTP Server</label>
                                <input className='w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md ' name='smtp-server' onChange={
                                    (e) => {
                                        setServer(e.target.value)
                                    }
                                } value={server} />
                            </div>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <label className='font-medium text-md'>SMTP Port <span className='text-sm text-gray-500'> (default: 465)</span></label>
                                <input className='w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md ' name='smtp-port'
                                    onChange={
                                        (e) => {
                                            setPort(e.target.value)
                                        }

                                    } value={port}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row items-start justify-between w-full gap-4'>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <label className='font-medium text-md'>SMTP Username</label>
                                <input className='w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md ' name='smtp-user'
                                    onChange={
                                        (e) => {
                                            setUser(e.target.value)
                                        }

                                    } value={user}
                                />
                            </div>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <label className='font-medium text-md'>SMTP Password</label>
                                <input type='password' className='w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md ' name='smtp-pass'
                                    onChange={
                                        (e) => {
                                            setPass(e.target.value)
                                        }
                                    } value={pass}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row items-start justify-between w-full gap-4'>
                            <div className='flex flex-row items-center justify-start w-full gap-3'>
                                <input id='ssl' type='checkbox' className='w-4 h-4 border-2 '
                                    onChange={
                                        (e) => {
                                            setSsl(e.target.checked)
                                        }
                                    } checked={ssl}
                                />
                                <label htmlFor='ssl' className='font-medium text-md'>SSL/TLS</label>
                            </div>
                        </div>
                        <div className='flex flex-row items-end justify-end w-full'>
                            <Button type='button' onClick={() => {
                                setOpenSmtp(false)
                                setOpenEmail(true)
                            }} className='text-lg' size="lg" >Next </Button>
                        </div>
                    </form>
                </Collapse>
            </div>
            <div className='w-[50%] overflow-hidden  shadow-xl border-2 flex flex-col border-gray-900 m-auto py-5 px-4 rounded-md'
            >
                <div className='flex flex-row items-center justify-between w-full cursor-pointer ' onClick={
                    () => {
                        setOpenEmail(!openEmail)
                        setOpenSmtp(false)
                        setOpenEmailReceipts(false)
                    }
                }>
                    <h2 className='text-xl font-semibold'>Set up email text & attachment</h2>
                    <Icon icon="iconamoon:arrow-down-2-light" className={`${openEmail ?
                        'transform rotate-180 transition-transform duration-500' :
                        'transform rotate-0 transition-transform duration-500'
                        }`}
                        fontSize={32} />
                </div>
                <Collapse open={openEmail}>
                    <form className='flex flex-col items-center justify-center w-full gap-2 mt-4 ' onSubmit={(e) => { e.preventDefault() }}
                    >
                        <div className='flex flex-row items-start justify-between w-full gap-4'>
                            <div className='flex flex-col items-start gap-2 justify-center w-full'>
                                <label className='font-medium text-md'>Email Subject</label>
                                <input className='w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md ' name='subject'
                                    onChange={
                                        (e) => {
                                            setSubject(e.target.value)
                                        }
                                    } value={subject}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row items-start justify-between w-full gap-4'>
                            <div className='flex flex-col items-start gap-2 justify-center w-full'>
                                <label className='font-medium text-md flex flex-col'>
                                    Email Body

                                    <p
                                        className='text-md text-gray-700 dark:text-gray-300'
                                    >
                                        You can use <span className='font-bold'>{`{{name}}`}</span> to use the name of the recipient in the email body
                                    </p>
                                    <span className='mt-4'>
                                        eg : <span className='font-bold'>Hello {`{{name}}`} , how are you ?</span>
                                    </span>
                                </label>
                                <textarea rows={4} className='w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md ' name='body'
                                    onChange={
                                        (e) => {
                                            setBody(e.target.value)
                                        }
                                    } value={body}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row items-start justify-between w-full gap-4'>
                            <div className='flex flex-col items-start gap-2 justify-center w-full'>
                                <label className='font-medium text-md'>Attachment</label>
                                <input type='file' className=' cursor-pointer w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md ' name='attachment'
                                    onChange={
                                        (e) => {
                                            uploadFile(e.target.files ? e.target.files[0] : null)
                                        }
                                    }
                                />
                            </div>
                        </div>
                        <div className='flex flex-row items-end justify-end w-full'>
                            <Button type='button' onClick={() => {
                                setOpenSmtp(false)
                                setOpenEmail(false)
                                setOpenEmailReceipts(true)
                                console.log('clicked')
                                console.log(openEmailReceipts)
                            }} className='text-lg' size="lg" >Next </Button>
                        </div>


                    </form>
                </Collapse>
            </div>
            <div className='w-[50%] overflow-hidden  shadow-xl border-2 flex flex-col border-gray-900 m-auto py-5 px-4 rounded-md'
            >
                <div className='flex flex-row items-center justify-between w-full cursor-pointer ' onClick={
                    () => {
                        setOpenEmailReceipts(!openEmailReceipts)
                        setOpenSmtp(false)
                        setOpenEmail(false)
                    }}>
                    <h2 className='text-xl font-semibold'>Set up recipients</h2>
                    <Icon icon="iconamoon:arrow-down-2-light" className={`${openEmailReceipts ?
                        'transform rotate-180 transition-transform duration-500' :
                        'transform rotate-0 transition-transform duration-500'
                        }`}
                        fontSize={32} />
                </div>
                <Collapse open={openEmailReceipts}>
                    <form className='flex flex-col items-center justify-center w-full gap-2 mt-4 ' onSubmit={(e) => { e.preventDefault() }}
                    >
                        <div className='flex flex-row items-start justify-between w-full gap-4'>
                            <div className='flex flex-col items-start justify-center w-full gap-3'>
                                <p className="text-xl font-bold">NOTE : <span className='font-normal'>Recipients format must be like this </span> email:name</p>
                                <p>eg : <span className='font-bold '>contact@atikdev.me:Yassine</span></p>
                                <textarea placeholder='' rows={4} className='w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md ' name='recipients'
                                    onChange={
                                        (e) => {
                                            setRecipients(e.target.value)
                                        }
                                    } value={recipients}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row items-end justify-end w-full'>
                            <Button type='button' onClick={() => {
                                handleSubmit()
                                setOpenSmtp(false)
                                setOpenEmail(false)
                                setOpenEmailReceipts(false)
                            }
                            } className='text-lg' size="lg" >Send bulk emails</Button>
                        </div>
                    </form>
                </Collapse>
            </div>
            {

                loading &&
                <div className='flex flex-col items-center justify-center'>
                    <Icon icon="tdesign:loading" className="animate-spin" fontSize={40} />
                    Sending emails ... ({sentEmails.length} / {recipients.split('\n').length})
                </div>

            }
        </div >
    )
}

export default Content