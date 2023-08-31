'use client'
import Content from '@/components/homePage/Content'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Image from 'next/image'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <div className='flex items-start flex-col justify-start w-full min-h-screen overflow-hidden'>
      <ToastContainer pauseOnHover={false} />
      <Header />
      <Content />
      <Footer />
    </div>
  )
}
