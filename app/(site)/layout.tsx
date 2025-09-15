import Header from '@/components/layout/Header'
import React from 'react'

const layout = ({children} : { children : React.ReactNode}) => {
  return (
    <div className='min-h-dvh flex flex-col w-full gap-5'>
      <Header />
      <main className='py-32 md:py-40'>
        {children}
      </main>
    </div>
  )
}

export default layout