import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from '../ThemeToggle'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <header className='absolute top-0 w-full flex flex-row gap-4 justify-between p-3 bg-transparent z-10'>
      <Link href={"/"} className='text-2xl font-semibold'>
        FormGenAI 
      </Link>
      <div className='flex justify-between gap-5'>
        <Button>SignIn</Button>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header