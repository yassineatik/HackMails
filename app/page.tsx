'use client'
import Content from '@/components/homePage/Content'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='flex items-start flex-col justify-start w-full min-h-screen overflow-hidden'>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}
