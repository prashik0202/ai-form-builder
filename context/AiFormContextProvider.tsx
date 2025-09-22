'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

import { useChat } from '@ai-sdk/react';

export type AIChatContextType = {
  completeMessages: string[];
  messages: ReturnType<typeof useChat>["messages"],
  sendMessage: ReturnType<typeof useChat>["sendMessage"],
  status: ReturnType<typeof useChat>["status"],
  error: ReturnType<typeof useChat>["error"];
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

export const AIChatContextProider = ({ children } : { children : ReactNode}) => {
  const [completeMessages, setCompleteMessages] = useState<string[]>([]);
  const { messages, sendMessage, status, error } = useChat();

  useEffect(() => {
    if(status === 'ready' && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      // only store the assistant message
      if(lastMessage.role === 'assistant') {

        const text = lastMessage.parts.filter((part) => {
          return part.type === 'text'
        }).map((part) => {
          return part.text
        }).join("");

        setCompleteMessages(prev => [...prev, text]);
      }
    }
  },[status, messages]);

  return(
    <AIChatContext.Provider
      value={{
        messages,
        sendMessage,
        status,
        error,
        completeMessages
      }}
    >
      {children}
    </AIChatContext.Provider>
  )
}

export const useAIChatContext = () => {
  const ctx = useContext(AIChatContext);
  if (!ctx) throw new Error("AIChatContext must be used inside ChatProvider");
  return ctx;
}