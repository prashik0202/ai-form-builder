"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { EllipsisVertical, Loader, Paperclip, SendHorizonal } from 'lucide-react'
import { useChat } from '@ai-sdk/react';
import { ThemeToggle } from '../ThemeToggle';
import { Response } from '@/components/ai-elements/response';

const AiChat = () => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [input, setInput] = useState('');
  const { messages, sendMessage, status, error } = useChat();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.currentTarget.value)
  }

  const handleOnKeyDown = (event : React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage({ text: input });
      setInput("");
    }
  }

  const handleFormSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(input === '') return;
    sendMessage({ text : input });
    setInput('');
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Messages container */}
      <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-5">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start '}`}
          >
            <div className='whitespace-pre-wrap px-4 py-2 max-w-[75%] shadow-2xl bg-accent-foreground/10 rounded-md text-sm'>
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
        {status === 'submitted' && <Loader className='animate-spin h-4 w-4'/>}
        {error && <p className='text-sm text-red-500'>Something went wrong!</p>}
        {/* invisible element to scroll into view */}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <form
        className="relative p-4 shrink-0"
        onSubmit={handleFormSubmit}
      >
        <Textarea
          className="resize-none h-24 w-full focus:outline-none shadow"
          value={input}
          placeholder="Say something...."
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
        />
        <div className="absolute bottom-6 right-6 flex gap-2">
          <ThemeToggle />
          <Button variant="ghost"><EllipsisVertical /></Button>
          <Button variant="ghost"><Paperclip /></Button>
          <Button variant="ghost" type="submit"><SendHorizonal /></Button>
        </div>
      </form>
    </div>
  )
}

export default AiChat