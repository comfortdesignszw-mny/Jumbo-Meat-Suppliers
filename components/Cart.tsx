
import React from 'react';
import { X, ShoppingBag, Trash2, Minus, Plus, MessageSquare } from 'lucide-react';
import { CartItem, WebsiteSettings } from '../types';

interface CartProps {
  settings: WebsiteSettings;
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ settings, isOpen, onClose, items, onRemove, onUpdateQty }) => {
  const handleCheckout = () => {
    const itemList = items.map(item => `- ${item.name} (x${item.quantity})`).join('\n');
    const message = encodeURIComponent(`Hi ${settings.name}! I would like to place an order for:\n\n${itemList}\n\nPlease confirm availability and total price.`);
    window.open(`https://wa.me/${settings.whatsapp}?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h2 className="text-xl font-black text-slate-900 uppercase flex items-center gap-3">
              <ShoppingBag size={24} className="text-red-800" />
              Your Braai Basket
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-4">
                  <ShoppingBag size={40} />
                </div>
                <p className="text-slate-500 font-bold">Your basket is empty.</p>
                <button 
                  onClick={onClose}
                  className="mt-4 text-red-800 font-black text-sm uppercase underline decoration-2 underline-offset-4"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center group">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                    <p className="text-xs text-slate-500 mb-2">{item.category}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-slate-100 rounded-lg p-1">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 hover:bg-white rounded shadow-sm transition-all"><Minus size={14} /></button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 hover:bg-white rounded shadow-sm transition-all"><Plus size={14} /></button>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-slate-400 hover:text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-red-800 text-sm">{item.priceRange.split(' ')[0]}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <button 
                onClick={handleCheckout}
                className="w-full bg-red-800 hover:bg-red-900 text-white py-4 rounded-xl font-black flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95"
              >
                ORDER ON WHATSAPP
                <MessageSquare size={20} />
              </button>
              <p className="mt-4 text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
                Orders are processed manually via WhatsApp
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
