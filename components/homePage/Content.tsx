import React, { useState } from 'react'
import {
    Collapse,
} from "@material-tailwind/react";
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from '../ui/button';
import axios from 'axios';

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
    const [attachment, setAttachment] = useState('')
    const [recipients, setRecipients] = useState('')
    const [loading, setLoading] = useState(false)
    const [sentEmails, setSentEmails]: any = useState([])

    const handleSubmit = () => {
        console.log('subject : ', subject)
        console.log('body : ', body)
        console.log('attachment : ', attachment)
        console.log('recipients : ', recipients)
        setLoading(true)

        const combo = recipients.split('\n')
        for (let i = 0; i < combo.length; i++) {
            const element = combo[i];

            const email = element.split(':')[0]
            const name = element.split(':')[1]
            let updatedBody = body.replaceAll('{{name}}', name)
            axios.post('/api/sendEmail', JSON.stringify(
                {
                    subject: subject,
                    toEmail: email,
                    otpText: updatedBody,
                    host: server,
                    port: port ? port : 465,
                    secure: ssl,
                    user: user,
                    pass: pass,
                }

            )).then(res => {
                console.log('res', res)
                if (res.status == 200) {
                    setSentEmails([...sentEmails, email])
                }
            }).catch(err => {
                console.log('waaaaaaaaa', err)
                if (err.response.data.message?.errno == -3008 || err.response.data.message?.errno == -3004) {
                    console.log('error')
                    alert('Couldn\'t connect to the server , please check your credentials')
                    i = combo.length
                } else {
                    alert('An error occured , please try again')
                }
            })
        }
        setLoading(false)

    }

    return (
        <div className='flex flex-col items-center justify-center w-full h-full gap-10 m-6'>
            <div className='w-[50%] overflow-hidden bg-white shadow-xl border-2 flex flex-col border-gray-900 m-auto py-5 px-4 rounded-md'>
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
                                <input className='w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md ' onChange={
                                    (e) => {
                                        setServer(e.target.value)
                                    }
                                } value={server} />
                            </div>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <label className='font-medium text-md'>SMTP Port <span className='text-sm text-gray-500'> (default: 465)</span></label>
                                <input className='w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md '
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
                                <input className='w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md '
                                    onChange={
                                        (e) => {
                                            setUser(e.target.value)
                                        }

                                    } value={user}
                                />
                            </div>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <label className='font-medium text-md'>SMTP Password</label>
                                <input className='w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md '
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
                                handleSubmit()
                                setOpenSmtp(false)
                                setOpenEmail(true)
                            }} className='text-lg' size="lg" >Next </Button>
                        </div>
                    </form>
                </Collapse>
            </div>
            <div className='w-[50%] overflow-hidden bg-white shadow-xl border-2 flex flex-col border-gray-900 m-auto py-5 px-4 rounded-md'
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
                            <div className='flex flex-col items-start justify-center w-full'>
                                <label className='font-medium text-md'>Email Subject</label>
                                <input className='w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md '
                                    onChange={
                                        (e) => {
                                            setSubject(e.target.value)
                                        }
                                    } value={subject}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row items-start justify-between w-full gap-4'>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <label className='font-medium text-md'>Email Body</label>
                                <textarea rows={4} className='w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md '
                                    onChange={
                                        (e) => {
                                            setBody(e.target.value)
                                        }
                                    } value={body}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row items-start justify-between w-full gap-4'>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <label className='font-medium text-md'>Attachment</label>
                                <input type='file' className='w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md '
                                    onChange={
                                        (e) => {
                                            setAttachment(e.target.value)

                                        }
                                    } value={attachment}
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
            <div className='w-[50%] overflow-hidden bg-white shadow-xl border-2 flex flex-col border-gray-900 m-auto py-5 px-4 rounded-md'
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
                                <textarea placeholder='' rows={4} className='w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md '
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
        </div >
    )
}

export default Content