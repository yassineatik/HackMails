import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='w-full py-3 border-t flex items-center justify-around  mt-auto'>
            <p className='text-lg text-gray-800 dark:text-gray-300'>
                Powered by <Link href="https://vercel.com/" className='font-bold cursor-pointer' target='_blank'>Vercel</Link>
            </p>
            <div className='Icons flex flex-row gap-3'>
                <Link href="https://github.com/yassineatik/highjourney" className='cursor-pointer' target='_blank'>
                    <Icon icon="akar-icons:github-fill" fontSize={26} />

                </Link>
                <Link href="https://twitter.com/IamYassineAtik" className='cursor-pointer' target='_blank'>
                    <Icon icon="akar-icons:twitter-fill" fontSize={26} />

                </Link>

            </div>
        </footer>
    )
}

export default Footer