'use client';
import React, { useEffect, useState } from 'react'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import AiChat from '@/components/feature/AiChat'
import { BaseForm } from '@/types/forms'
import DynamicForm from '@/components/feature/DynamicForm'
import { useAIChatContext } from '@/context/AiFormContextProvider'
import { extractJson } from '@/lib/extractJson';
import { Skeleton } from '@/components/ui/skeleton';

const FormGenAIPage = () => {

  const chat = useAIChatContext();

  // Get the latest assistant message
  const [formSchema, setFormSchema] = useState<BaseForm | null>(null);

  useEffect(() => {
    const latestMessage = chat.completeMessages.at(-1) || "";
    try {
      if (latestMessage) {
        const formatedJson = extractJson(latestMessage);
        const parsed = JSON.parse(formatedJson);
        setFormSchema(parsed); // only update when JSON changes
      }
    } catch {
      // ignore invalid JSON
    }
  }, [chat.completeMessages]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-dvh rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize={25} className='min-w-[400px]'>
        <AiChat props={chat} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75} className='min-w-2xs mx-2'>
        {/* <FormRender /> */}
        {formSchema && chat.status !== 'streaming' &&  (
          <div className="h-full flex flex-col justify-center relative">
            <DynamicForm formFields={formSchema} />
          </div>
        )}
        {chat.status === 'streaming' && (
          <div className="h-full flex flex-col justify-center items-center">
            <Skeleton className="h-[600px] w-[450px] rounded-xl" />
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default FormGenAIPage