import React from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Home = () => {
  return (
    <div className='flex flex-col gap-10'>
      <div className='p-10 flex flex-col gap-5'>
        <h2 className='text-5xl md:text-7xl lg:text-8xl text-purple-500'>FormGenAi</h2>
        <p className='text-lg md:text-xl lg:text-2xl text-muted-foreground'>Generate Form with AI with support of shadcn ui + Zod validation.</p>
        <Button className='w-fit' size={"lg"} asChild>
          <Link href={"/genform"}>
            Get Started
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Home