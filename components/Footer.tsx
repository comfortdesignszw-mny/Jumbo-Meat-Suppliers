
import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ShieldAlert } from 'lucide-react';
import { WebsiteSettings } from '../types';

interface FooterProps {
  settings: WebsiteSettings;
  onNavigate?: (view: any) => void;
}

const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate?.('home')}>
              <div className="w-8 h-8 bg-red-800 rounded flex items-center justify-center text-white font-bold text-lg">J</div>
              <span className="text-xl font-black text-white tracking-tighter uppercase">{settings.name}</span>
            </div>
            <p className="text-sm leading-relaxed">
              Bulawayo's premier destination for fresh, high-quality meats. We pride ourselves on tradition, quality, and service.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-red-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => onNavigate?.('home')} className="hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate?.('products')} className="hover:text-white transition-colors">Products</button></li>
              <li><button onClick={() => onNavigate?.('about')} className="hover:text-white transition-colors">Our Story</button></li>
              <li><button onClick={() => onNavigate?.('contact')} className="hover:text-white transition-colors">Contact Us</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Store Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={18} className="text-red-800 flex-shrink-0" />
                <span>{settings.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="text-red-800 flex-shrink-0" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-red-800 flex-shrink-0" />
                <span>{settings.email}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">We're Open</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span className="text-white">{settings.hours.weekday}</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white">{settings.hours.saturday}</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-slate-500">{settings.hours.sunday}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} {settings.name} Bulawayo. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <button 
              onClick={() => onNavigate?.('admin')} 
              className="flex items-center gap-1 hover:text-red-500 transition-colors uppercase tracking-widest font-black"
            >
              <ShieldAlert size={14} />
              Admin Portal
            </button>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
