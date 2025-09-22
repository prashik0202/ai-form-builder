"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Brain, EllipsisVertical, Loader, Paperclip, SendHorizonal, Sparkles } from 'lucide-react'
import { useChat } from '@ai-sdk/react';
import { Response } from '@/components/ai-elements/response';
import { AIChatContextType, useAIChatContext } from '@/context/AiFormContextProvider';
import { promptsExample } from '@/lib/promtsExample';

interface AiChatProps {
  props: AIChatContextType
}

const AiChat = ({ props } : AiChatProps) => {

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [input, setInput] = useState('');

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.messages]);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.currentTarget.value)
  }

  const handleOnKeyDown = (event : React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      props.sendMessage({ text: input });
      setInput("");
    }
  }
  
  const handleFormSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(input === '') return;
    props.sendMessage({ text : input });
    setInput('');
  }

  const handleSuggesstionClicked = (suggestion: string) => {
    if (!suggestion) return;
    props.sendMessage({ text: suggestion });
    setInput('');
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Messages container */}
      <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-5">
        {props.messages.length === 0 && props.error === undefined && (
          <div className='mt-32'>
            <h2 className='text-2xl text-center'>FormGen<span className='text-purple-500'>AI</span></h2>
            <p className='text-md text-center text-muted-foreground mt-4'>You can create custom and fully functional forms with help of AI</p>
            <div className='mt-20 flex flex-wrap gap-x-3 gap-y-2 justify-center'>
              {promptsExample.map((prompt,index) => (
                <div 
                  className='truncate whitespace-nowrap overflow-hidden p-2 px-3 bg-accent rounded-full text-muted-foreground hover:cursor-pointer' 
                  key={index}
                  onClick={() => handleSuggesstionClicked(prompt)}
                >
                  {prompt}
                </div>
              ))}
            </div>
          </div>
        )}
        {props.messages && props.messages.map(message => (
          <div
            key={message.id}
            className={`flex mt-10 ${message.role === 'user' ? 'justify-end' : 'justify-start items-start gap-2'}`}
          >
            {message.role === 'assistant' && <Brain className='h-4 w-4 text-yellow-500'/>}
            <div className='whitespace-pre-wrap px-4 py-2 max-w-[90%] shadow-2xs bg-accent rounded-md text-md'>
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return (
                      <Response key={`${message.id}-${i}`}>
                        {part.text}
                      </Response>
                    )
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}
        {props.status === 'submitted' && <Loader className='animate-spin h-4 w-4'/>}
        {props.error && <p className='text-sm text-red-500'>Something went wrong!</p>}
        {/* invisible element to scroll into view */}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <form
        className="relative p-4 shrink-0"
        onSubmit={handleFormSubmit}
      >
        <Textarea
          className="resize-none h-24 w-full focus:outline-none shadow md:text-md"
          value={input}
          placeholder="Say something.... and create beautiful form ✨"
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
        />
        <div className="absolute bottom-6 right-6 flex gap-2">
          <Button variant="ghost"><EllipsisVertical /></Button>
          <Button variant="ghost"><Paperclip /></Button>
          <Button variant="ghost" type="submit"><SendHorizonal /></Button>
        </div>
      </form>
    </div>
  )
}

export default AiChat