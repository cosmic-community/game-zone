'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '@/types';

interface ChatRoomProps {
  initialMessages: ChatMessage[];
}

export default function ChatRoom({ initialMessages }: ChatRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsJoined(true);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, message: message.trim() }),
      });

      if (response.ok) {
        const { message: newMessage } = await response.json();
        setMessages((prev) => [newMessage, ...prev]);
        setMessage('');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshMessages = async () => {
    try {
      const response = await fetch('/api/chat');
      if (response.ok) {
        const { messages: newMessages } = await response.json();
        setMessages(newMessages);
      }
    } catch (error) {
      console.error('Failed to refresh messages:', error);
    }
  };

  if (!isJoined) {
    return (
      <div className="bg-surface rounded-2xl p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold font-gaming mb-6 text-center">
          Join the Chat
        </h2>
        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Choose your username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-surface-light border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter username..."
              required
              minLength={2}
              maxLength={20}
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Join Chat 💬
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="bg-surface-light p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold">
            {username[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">{username}</p>
            <p className="text-xs text-muted">Online</p>
          </div>
        </div>
        <button 
          onClick={refreshMessages}
          className="text-muted hover:text-white transition-colors p-2"
          title="Refresh messages"
        >
          🔄
        </button>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {[...messages].reverse().map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 ${msg.metadata.username === username ? 'flex-row-reverse' : ''}`}
          >
            {msg.metadata.avatar ? (
              <img
                src={`${msg.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={msg.metadata.username}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
                {msg.metadata.username[0]?.toUpperCase()}
              </div>
            )}
            <div className={`max-w-[70%] ${msg.metadata.username === username ? 'text-right' : ''}`}>
              <p className="text-xs text-muted mb-1">{msg.metadata.username}</p>
              <div 
                className={`px-4 py-2 rounded-2xl ${
                  msg.metadata.username === username 
                    ? 'bg-primary text-primary-foreground rounded-br-none' 
                    : 'bg-surface-light rounded-bl-none'
                }`}
              >
                {msg.metadata.message}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-3 bg-surface-light border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Type a message..."
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="btn-primary"
            disabled={isLoading || !message.trim()}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}