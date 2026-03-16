"use client";

import React, { useState } from 'react';
import { useChat } from 'ai/react';
import { Send, Loader2 } from 'lucide-react';
import { AppNode } from '@/types/app';
import { useAppStore } from '@/store/useAppStore';

interface AIAgentProps {
  node: AppNode;
}

export default function AIAgent({ node }: AIAgentProps) {
  const { agentSettings } = useAppStore();
  const { nodes } = useAppStore();
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      system: agentSettings.systemPrompt,
      model: agentSettings.model,
      context: nodes.map(n => ({ type: n.type, props: n.props })),
    }
  });

  return (
    <div className="flex flex-col h-80 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden pointer-events-auto">
      <div className="bg-gray-50 p-3 border-b border-gray-200 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">AI Assistant</span>
        {isLoading && <Loader2 className="animate-spin text-blue-500" size={16} />}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
              m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask something..."
          className="flex-1 text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
