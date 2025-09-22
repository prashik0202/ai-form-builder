import Header from '@/components/layout/Header'
import { AIChatContextProider } from '@/context/AiFormContextProvider'
import React from 'react'

const layout = ({ children } : { children : React.ReactNode }) => {
  return (
    <div className='h-full flex flex-col'>
      <Header />
      <AIChatContextProider>
        {children}
      </AIChatContextProider>
    </div>
  )
}

export default layout