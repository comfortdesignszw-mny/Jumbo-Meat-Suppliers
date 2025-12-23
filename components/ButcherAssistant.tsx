
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Product, BlogPost } from '../types';

interface ButcherAssistantProps {
  products: Product[];
  blogPosts: BlogPost[];
}

const ButcherAssistant: React.FC<ButcherAssistantProps> = ({ products, blogPosts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Hello! I am Jumbo, your virtual Master Butcher. Ask me about our fresh cuts, current events, or cooking tips!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Construct a knowledge base string from live data
      const inventoryContext = products.length > 0 
        ? products.map(p => `- ${p.name} (${p.category}): ${p.priceRange}`).join('\n')
        : "No items currently listed in the online catalog.";
        
      const newsContext = blogPosts.length > 0
        ? blogPosts.map(p => `- ${p.title}: ${p.excerpt}`).join('\n')
        : "No recent updates.";

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are a professional Master Butcher at Jumbo Meat Suppliers in Bulawayo, Zimbabwe. 
          
          CURRENT INVENTORY:
          ${inventoryContext}
          
          LATEST NEWS/EVENTS:
          ${newsContext}

          Your goal is to help customers with:
          1. REAL-TIME Selection: Use the list above to tell them exactly what we have. If they ask for something not on the list, apologize and mention what we DO have.
          2. Cooking tips (braai, slow cooking, roasting).
          3. Zimbabwean favorite recipes (e.g., Sadza with beef stew, Mogodu/Tripe).
          
          Be friendly, expert, and professional. Mention the shop's location in Bulawayo occasionally. 
          Keep answers concise and helpful. If a user wants to order, tell them to add items to their basket and use the WhatsApp checkout.`,
        }
      });

      const aiText = response.text || "I'm sorry, I'm having a bit of trouble connecting to the kitchen right now. Please try again or call us directly!";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm currently busy helping another customer. Please feel free to call our shop for immediate help!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="bg-red-800 p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={24} />
              </div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-wider leading-none">Jumbo Assistant</h4>
                <span className="text-[10px] opacity-75 font-bold">Online • Master Butcher</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-red-800 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 rounded-tl-none flex items-center gap-2 text-slate-400">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-xs font-bold">Butcher is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for cooking tips..."
              className="flex-grow px-4 py-2 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-red-800 outline-none text-sm"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="w-10 h-10 bg-red-800 text-white rounded-xl flex items-center justify-center hover:bg-red-900 transition-all active:scale-95 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-red-800 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-red-900 transition-all transform hover:scale-110 active:scale-95 group"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />}
      </button>
    </div>
  );
};

export default ButcherAssistant;
