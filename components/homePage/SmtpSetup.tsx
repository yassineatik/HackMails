import React from 'react';
import { Collapse } from "@material-tailwind/react";
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from '../ui/button';

function SmtpSetup({ open, onClick, server, setServer, port, setPort, user, setUser, pass, setOpenSmtp, setOpenEmail, setPass, ssl, setSsl }: any) {
    return (
        <div className='w-[80%] sm:w-[75%] md:w-[50%] overflow-hidden shadow-xl border-2 flex flex-col border-gray-900 m-auto py-3 px-3  md:py-5 md:px-4 rounded-md '>
            <div className='flex flex-row items-center justify-between w-full cursor-pointer ' onClick={onClick}>
                <h2 className='text-lg sm:text-xl font-semibold'>Set up your SMTP</h2>
                <Icon
                    icon="iconamoon:arrow-down-2-light"
                    className={`${open ? 'transform rotate-180 transition-transform duration-500' : 'transform rotate-0 transition-transform duration-500'}`}
                    fontSize={32}
                />
            </div>
            <Collapse open={open}>
                <p
                    className='sm:text-md text-sm text-gray-700 dark:text-gray-300 mt-2'
                >
                    <span className='font-bold'>NOTE : </span> If you are using gmail , you can follow  <a href='https://www.gmass.co/blog/gmail-smtp/' target='_blank' className='text-blue-500'>this guide</a> to get your SMTP credentials
                </p>
                <form onSubmit={(e) => { e.preventDefault() }}
                    className='flex flex-col items-center justify-center w-full gap-3 mt-4'>
                    <div className='flex flex-col md:flex-row items-start justify-between w-full gap-4'>

                        <div className='flex flex-col items-start justify-center w-full'>
                            <label className='font-medium text-sm sm:text-md'>SMTP Server</label>
                            <input className='w-full p-2 font-medium dark:bg-neutral-700 border-2 border-gray-900 rounded-md text-md ' name='smtp-server' onChange={
                                (e) => {
                                    setServer(e.target.value)
                                }
                            } value={server} />
                        </div>
                        <div className='flex flex-col items-start justify-center w-full'>
                            <label className='font-medium text-sm sm:text-md'>SMTP Port <span className='text-sm text-gray-500'> (default: 465)</span></label>
                            <input className='w-full p-2 font-medium dark:bg-neutral-700 border-2 border-gray-900 rounded-md text-md ' name='smtp-port'
                                onChange={
                                    (e) => {
                                        setPort(e.target.value)
                                    }

                                } value={port}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-start justify-between w-full gap-4'>
                        <div className='flex flex-col items-start justify-center w-full'>
                            <label className='font-medium text-sm sm:text-md'>SMTP Username</label>
                            <input className=' dark:bg-neutral-700 w-full p-2 font-medium border-2   border-gray-900 rounded-md text-md ' name='smtp-user'
                                onChange={
                                    (e) => {
                                        setUser(e.target.value)
                                    }

                                } value={user}
                            />
                        </div>
                        <div className='flex flex-col items-start justify-center w-full'>
                            <label className='font-medium text-sm sm:text-md'>SMTP Password</label>
                            <input type='password' className=' dark:bg-neutral-700  w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md ' name='smtp-pass'
                                onChange={
                                    (e) => {
                                        setPass(e.target.value)
                                    }
                                } value={pass}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-start justify-between w-full gap-4'>
                        <div className='flex flex-row items-center justify-start w-full gap-3'>
                            <input id='ssl' type='checkbox' className='w-4 h-4 border-2 '
                                onChange={
                                    (e) => {
                                        setSsl(e.target.checked)
                                    }
                                } checked={ssl}
                            />
                            <label htmlFor='ssl' className='font-medium text-sm sm:text-md'>SSL/TLS</label>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-end justify-end w-full'>
                        <Button type='button' onClick={() => {
                            setOpenSmtp(false)
                            setOpenEmail(true)
                        }} className='text-lg' size="lg" >Next </Button>
                    </div>
                </form>
            </Collapse>
        </div>
    );
}

export default SmtpSetup;
