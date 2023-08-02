"use client"
import Link from 'next/link'
import React from 'react'
import { Switch } from '../ui/switch'
import { Icon } from '@iconify/react';
import { useTheme } from 'next-themes'



const Header = () => {

    const { theme, setTheme } = useTheme()
    return (
        <div className='flex flex-row border-b border-b-gray-100 w-full justify-around items-center px-10 py-4 '>
            <h3 className='text-3xl text-cyan-800 font-bold first-letter:text-cyan-600 tracking-wider  whitespace-nowrap  dark:first-letter:text-cyan-400 bg-gradient-to-b from-slate-600 via-slate-500 to-gray-800 dark:bg-gradient-to-b dark:from-slate-400 dark:via-slate-500 dark:to-gray-300   bg-clip-text text-transparent'>
                <Link href="/">High Journey</Link>
            </h3>
            <ul className='flex flex-row gap-7 justify-center w-full  items-center list-none  m-auto'>
                <li className='text-sm'><Link href="/playground">Playground</Link></li>
                <li className='text-sm'><Link href="/pricing">Pricing</Link></li>
            </ul>
            <div className='flex flex-row gap-3 items-center justify-center'>
                <Icon icon="solar:sun-outline" />
                <Switch className='float-right' onCheckedChange={(e) => {
                    setTheme(e ? 'dark' : 'light')
                }} />
                <Icon icon="circum:dark" />
            </div>
        </div>
    )
}

export default Header