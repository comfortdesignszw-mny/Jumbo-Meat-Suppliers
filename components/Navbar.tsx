
import React, { useState } from 'react';
import { Menu, X, Phone, ShoppingCart } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

interface NavbarProps {
  activeView: string;
  onNavigate: (view: any) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, onNavigate, cartCount, onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Products', id: 'products' },
    { name: 'Blog', id: 'blog' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div 
            onClick={() => onNavigate('home')} 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <div className="w-10 h-10 bg-red-800 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              J
            </div>
            <span className="text-xl font-black text-red-900 tracking-tight uppercase">
              Jumbo Meats
            </span>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  activeView === link.id ? 'text-red-800 border-b-2 border-red-800 pb-1' : 'text-slate-500 hover:text-red-800'
                }`}
              >
                {link.name}
              </button>
            ))}
            
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-slate-600 hover:text-red-800 transition-colors"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-800 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="bg-red-800 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-red-900 transition-all shadow-lg active:scale-95"
            >
              <Phone size={14} />
              Support
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-slate-600 hover:text-red-800 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-800 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-red-800 p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="block w-full text-left px-3 py-4 text-xs font-black uppercase tracking-widest text-slate-700 hover:text-red-800 hover:bg-red-50 rounded-md"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
