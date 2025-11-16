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

  // Custom palette provided by user (now using warm orange shades)
  const palette = {
    // used as primary text / accent (dark warm)
    federal_blue: {
      DEFAULT: '#7A2B00',
      '100': '#fff7f2',
      '200': '#ffe9dd',
      '300': '#ffd0b8',
      '400': '#ffb287',
      '500': '#ff944f',
      '600': '#ff7a1a',
      '700': '#e56300',
      '800': '#b34a00',
      '900': '#7a2b00'
    },
    // main CTA / toggle button (bright orange)
    honolulu_blue: {
      DEFAULT: '#ff6a00',
      '100': '#fff5ef',
      '200': '#ffe6d9',
      '300': '#ffd0b2',
      '400': '#ffb07a',
      '500': '#ff944f',
      '600': '#ff7a1a',
      '700': '#e65a00',
      '800': '#b34700',
      '900': '#7a2b00'
    },
    // send button / accent (softer orange)
    pacific_cyan: {
      DEFAULT: '#ff9a3c',
      '100': '#fff6ee',
      '200': '#ffe9d4',
      '300': '#ffd8b3',
      '400': '#ffc08a',
      '500': '#ffac5f',
      '600': '#ff982e',
      '700': '#e67f00',
      '800': '#b36300',
      '900': '#7f3f00'
    },
    // bot bubble background (pale peach)
    non_photo_blue: {
      DEFAULT: '#ffd9b3',
      '100': '#fff9f4',
      '200': '#fff0e6',
      '300': '#ffe1c9',
      '400': '#ffd0aa',
      '500': '#ffc294',
      '600': '#ffb47a',
      '700': '#e69a56',
      '800': '#b3763f',
      '900': '#7f4726'
    },
    // header / subtle background (very pale peach)
    light_cyan: {
      DEFAULT: '#fff3ea',
      '100': '#ffffff',
      '200': '#fffaf6',
      '300': '#fff4ef',
      '400': '#fff0e6',
      '500': '#fff0e0',
      '600': '#ffe6d6',
      '700': '#ffd8c6',
      '800': '#ffcab0',
      '900': '#f0b997'
    }
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
              className="flex-1 resize-none px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-300 bg-white placeholder-gray-500"
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
