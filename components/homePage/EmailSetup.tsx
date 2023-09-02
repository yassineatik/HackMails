import React from 'react';
import { Collapse } from "@material-tailwind/react";
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from '../ui/button';

function EmailSetup({ open, onClick, subject, setSubject, body, setBody, uploadFile, openEmail, setOpenEmail, setOpenSmtp, setOpenEmailReceipts }: any) {
    return (
        <div className='w-[80%] sm:w-[75%] md:w-[50%]  overflow-hidden shadow-xl border-2 flex flex-col border-gray-900 m-auto py-3 px-3  md:py-5 md:px-4 rounded-md'>
            <div className='flex flex-row items-center justify-between w-full cursor-pointer ' onClick={onClick}>
                <h2 className='text-lg sm:text-xl font-semibold'>Set up email text & attachment</h2>
                <Icon
                    icon="iconamoon:arrow-down-2-light"
                    className={`${open ? 'transform rotate-180 transition-transform duration-500' : 'transform rotate-0 transition-transform duration-500'}`}
                    fontSize={32}
                />
            </div>
            <Collapse open={open}>
                <form className='flex flex-col items-center justify-center w-full gap-2 mt-4 ' onSubmit={(e) => { e.preventDefault() }}
                >
                    <div className='flex flex-row items-start justify-between w-full gap-4'>
                        <div className='flex flex-col items-start gap-2 justify-center w-full'>
                            <label className='font-medium text-md'>Email Subject</label>
                            <input className=' dark:bg-neutral-700 w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md ' name='subject'
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
                            <textarea rows={4} className='dark:bg-neutral-700 w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md ' name='body'
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
                            <input type='file' accept='application/pdf' className=' block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400' name='attachment'
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
                        }} className='text-lg' size="lg" >Next </Button>
                    </div>


                </form>
            </Collapse>
        </div>
    );
}

export default EmailSetup;
