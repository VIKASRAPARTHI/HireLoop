import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can we help you today?' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const [chatImgAvailable, setChatImgAvailable] = useState(true);

  // Custom palette provided by user
  const palette = {
    federal_blue: { DEFAULT: '#03045e', 100: '#010113', 200: '#010226', 300: '#020338', 400: '#02044b', 500: '#03045e', 600: '#0508ae', 700: '#0f12f8', 800: '#5f61fa', 900: '#afb0fd' },
    honolulu_blue: { DEFAULT: '#0077b6', 100: '#001825', 200: '#003049', 300: '#00486e', 400: '#005f93', 500: '#0077b6', 600: '#00a2f9', 700: '#3bbaff', 800: '#7cd1ff', 900: '#bee8ff' },
    pacific_cyan: { DEFAULT: '#00b4d8', 100: '#00242b', 200: '#004756', 300: '#006b81', 400: '#008fab', 500: '#00b4d8', 600: '#12d8ff', 700: '#4ee1ff', 800: '#89ebff', 900: '#c4f5ff' },
    non_photo_blue: { DEFAULT: '#90e0ef', 100: '#0a3a43', 200: '#137586', 300: '#1dafc9', 400: '#4ccfe6', 500: '#90e0ef', 600: '#a6e7f2', 700: '#bcedf5', 800: '#d2f3f9', 900: '#e9f9fc' },
    light_cyan: { DEFAULT: '#caf0f8', 100: '#0a444f', 200: '#15889f', 300: '#2ac4e3', 400: '#79daee', 500: '#caf0f8', 600: '#d4f3f9', 700: '#dff6fb', 800: '#e9f9fc', 900: '#f4fcfe' }
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [isOpen, messages]);

  function scrollToBottom() {
    // small timeout so DOM updates first
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 40);
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { sender: 'user', text }]);
    setInput('');

    // simulate bot reply
    setTimeout(() => {
      setMessages((m) => [...m, { sender: 'bot', text: 'Thanks — we received your message and will reply shortly.' }]);
    }, 900);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Chat toggle button */}
      <button
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        onClick={() => setIsOpen((s) => !s)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transform transition-transform"
        style={{ backgroundColor: palette.honolulu_blue.DEFAULT, color: '#ffffff' }}
      >
        {isOpen ? (
          <X className="w-6 h-6 p-1" />
        ) : chatImgAvailable ? (
          <img
            src="/chat.png"
            alt="chat"
            className="w-8 h-8 object-contain p-1"
            onError={() => setChatImgAvailable(false)}
            style={{ backgroundColor: 'transparent' }}
          />
        ) : (
          <MessageCircle className="w-6 h-6 p-1" />
        )}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-40 w-96 h-[520px] rounded-2xl shadow-2xl border border-gray-200 bg-white text-gray-900 flex flex-col overflow-hidden transition-all transform ${
          isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="p-4" style={{ backgroundColor: palette.light_cyan.DEFAULT, color: palette.federal_blue.DEFAULT }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Chat with us</h3>
              </div>
              <p className="text-xs opacity-90">We typically reply in a few minutes</p>
            </div>
            <button aria-label="Close chat" onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-white/10">
              <X className="w-5 h-5 p-0.5" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-white">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[80%] px-4 py-2 rounded-2xl"
                style={
                  msg.sender === 'user'
                    ? { backgroundColor: palette.light_cyan.DEFAULT, color: palette.federal_blue.DEFAULT }
                    : { backgroundColor: palette.non_photo_blue.DEFAULT, color: '#0f172a' }
                }
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
              <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 resize-none px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sky-300 bg-white text-gray-900 placeholder-gray-500"
              rows={1}
            />

            <button onClick={handleSend} className="px-3 py-2 rounded-md flex items-center justify-center" style={{ backgroundColor: palette.pacific_cyan.DEFAULT, color: '#ffffff' }}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
