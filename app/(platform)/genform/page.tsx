import React from 'react'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import AiChat from '@/components/feature/AiChat'
import FormRender from '@/components/feature/FormRender'

const FormGenAIPage = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-dvh rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize={40} className='min-w-[500px]'>
        <AiChat />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <FormRender />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default FormGenAIPage