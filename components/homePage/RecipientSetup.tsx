import React from 'react';
import { Collapse } from "@material-tailwind/react";
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from '../ui/button';

function RecipientSetup({ open, onClick, recipients, setRecipients, handleSubmit, setOpenEmail, setOpenSmtp, setOpenEmailReceipts }: any) {
    return (
        <div className='w-[80%] sm:w-[75%] md:w-[50%] overflow-hidden shadow-xl border-2 flex flex-col border-gray-900 m-auto py-3 px-3  md:py-5 md:px-4 rounded-md'>
            <div className='flex flex-row items-center justify-between w-full cursor-pointer ' onClick={onClick}>
                <h2 className=' text-lg sm:text-xl font-semibold'>Set up recipients</h2>
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
                        <div className='flex flex-col items-start justify-center w-full gap-3'>
                            <p className="text-lg md:font-xl font-bold">NOTE : <span className='font-normal'>Recipients format must be like this </span> email:name</p>
                            <p>eg : <span className='font-bold '>contact@atikdev.me:Yassine</span></p>
                            <textarea placeholder='email@xyz.com:name' rows={4} className='dark:bg-neutral-700 w-full p-2 font-medium border-2 border-gray-900 rounded-md text-md ' name='recipients'
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
    );
}

export default RecipientSetup;
