'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

interface Message {
  id: string;
  name: string;
  message: string;
  imageUrl?: string;
  createdAt: string;
}

export default function MessageWall() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  // Generate a random ID for localStorage messages
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/messages');
      
      if (!response.ok) {
        console.error('Error fetching messages:', response.statusText);
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setMessages(data);
      setUseLocalStorage(false);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages from server. Using local storage instead.');
      
      // If API call fails, try to use localStorage
      const storedMessages = localStorage.getItem('messages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
      setUseLocalStorage(true);
      
      toast.error('Database connection failed. Using local storage instead.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file size is greater than 1MB
    if (file.size > 1 * 1024 * 1024) {
      toast.error('size aukat me rakh bsdk (keep file under 1MB)');
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast.error('Name and message are required!');
      return;
    }
    
    setLoading(true);
    
    try {
      if (useLocalStorage) {
        // If using localStorage due to DB connection issues
        const newMessage: Message = {
          id: generateId(),
          name,
          message,
          imageUrl: preview || undefined,
          createdAt: new Date().toISOString()
        };
        
        const updatedMessages = [newMessage, ...messages];
        setMessages(updatedMessages);
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
        
        toast.success('Message added locally!');
      } else {
        // Normal API submission
        const formData = new FormData();
        formData.append('name', name);
        formData.append('message', message);
        if (image) {
          formData.append('image', image);
        }
        
        const response = await fetch('/api/messages', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Failed to submit message');
        }
        
        await fetchMessages();
        toast.success('Message posted successfully!');
      }
      
      // Reset form
      setName('');
      setMessage('');
      setImage(null);
      setPreview(null);
      
    } catch (err) {
      console.error('Error submitting message:', err);
      
      if (!useLocalStorage) {
        // If API submission fails, fall back to localStorage
        setUseLocalStorage(true);
        toast.error('Failed to submit to server. Switched to local storage mode.');
        
        // Try again with localStorage
        handleSubmit(e);
        return;
      }
      
      toast.error('Failed to add message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#f79a24',
            border: '1px solid #f79a24',
          },
        }}
      />
      
      {useLocalStorage && (
        <div className="bg-orange-900/20 text-orange-400 p-4 mb-8 rounded-md border border-orange-500/30">
          <p className="font-bold">Database connection issue detected!</p>
          <p>Messages are being stored locally in your browser. They will not be visible to others.</p>
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-[#1a1a1a] to-black p-6 rounded-md border border-[#f79a24]/30 mb-12"
      >
        <h3 className="text-2xl font-bold mb-4 text-[#f79a24]">Leave Your Message</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-[#f79a24]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f79a24] text-white"
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-[#f79a24]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f79a24] text-white h-24"
              placeholder="Write your message..."
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-1">Upload Image (optional)</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full px-4 py-2 bg-black/50 border border-[#f79a24]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f79a24] text-white"
            />
            {preview && (
              <div className="mt-2 relative h-40 w-full max-w-xs">
                <Image 
                  src={preview} 
                  alt="Preview" 
                  fill
                  className="object-contain rounded-md border border-[#f79a24]/30" 
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setImage(null);
                  }}
                  className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-[#f79a24] text-black font-bold rounded-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Message'}
          </motion.button>
        </form>
      </motion.div>
      
      {/* Messages Display */}
      <div>
        {error && !loading && messages.length === 0 && (
          <div className="p-6 rounded-md bg-red-900/20 border border-red-500/30 text-center">
            <p className="text-lg text-red-400">{error}</p>
            <p className="mt-2 text-gray-400">Try refreshing the page or check your connection.</p>
          </div>
        )}
        
        {loading && messages.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#f79a24]/20"></div>
              <div className="mt-4 text-[#f79a24]">Loading messages...</div>
            </div>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="mb-4 p-4 rounded-md bg-gradient-to-br from-[#1a1a1a] to-black border border-[#f79a24]/20 overflow-hidden"
              >
                <div className="flex justify-between mb-2">
                  <h4 className="font-bold text-lg text-[#f79a24]">{msg.name}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-300 mb-3">{msg.message}</p>
                {msg.imageUrl && (
                  <div className="relative w-full" style={{ height: msg.imageUrl ? '200px' : '0' }}>
                    <Image 
                      src={msg.imageUrl} 
                      alt={`Image by ${msg.name}`} 
                      fill
                      className="object-contain rounded-md" 
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </Masonry>
        )}
        
        {!loading && messages.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-400">No messages yet. Be the first to leave a message!</p>
          </div>
        )}
      </div>
    </div>
  );
}