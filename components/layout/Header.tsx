"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Switch } from '../ui/switch'
import { Icon } from '@iconify/react';
import { useTheme } from 'next-themes'
import { CiDark } from "react-icons/ci"
import { GoSun } from 'react-icons/go'
import Image from 'next/image'



const Header = () => {

    const { theme, setTheme } = useTheme()
    const [isDark, setIsDark] = React.useState(false)
    useEffect(() => {
        if (theme == 'dark') {
            setIsDark(true)
        } else {
            setIsDark(false)
        }
    }, [theme])

    return (
        <div className='flex flex-row border-b dark:border-b-gray-100 w-full justify-around items-center px-3 md:px-10 py-3 md:py-4  border-b-gray-300 '>
            <h3 className='text-xl md:text-2xl lg:text-3xl flex flex-row items-center gap-2  dark:text-gray-300 font-bold  tracking-wider  whitespace-nowrap   text-gray-700'>
                <Link href="/">HackMails</Link>
                <Icon icon="clarity:email-line" className=" animate-bounce" />
            </h3>
            {/* <ul className='flex flex-row gap-7 justify-center w-full  items-center list-none  m-auto'>
                <li className='text-sm'><Link href="/playground">Playground</Link></li>
                <li className='text-sm'><Link href="/pricing">Pricing</Link></li>
            </ul> */}
            <div className='flex flex-row gap-3 items-center justify-center'>
                <GoSun />
                <Switch className='float-right'
                    checked={isDark}

                    onCheckedChange={(e) => {
                        setTheme(e ? 'dark' : 'light')
                        console.log(theme)
                    }} />
                <CiDark />
            </div>
        </div>
    )
}

export default Header