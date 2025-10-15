
import FormBuilder from '@/components/feature/FormBuilder'
import FormPreview from '@/components/feature/FormPreview'
import { ThemeToggle } from '@/components/ThemeToggle'

import React from 'react'

const page = () => {
  return (
    <div className='p-5'>
      <h2 className='text-2xl'>Form builder</h2>
      <ThemeToggle />
      <div className='flex'>
        <FormBuilder />
      </div>
    </div>
  )
}

export default page 