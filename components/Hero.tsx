
import React from 'react';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { WebsiteSettings } from '../types';

interface HeroProps {
  settings: WebsiteSettings;
  onNavigate?: (view: any) => void;
}

const Hero: React.FC<HeroProps> = ({ settings, onNavigate }) => {
  return (
    <div className="relative min-h-screen flex items-center pt-20">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={settings.heroImage}
          alt="Premium butcher shop interior display"
          className="w-full h-full object-cover transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <h2 className="text-red-500 font-bold tracking-widest uppercase mb-4 animate-in fade-in slide-in-from-left duration-700">
            Est. 2010 • Bulawayo, Zimbabwe
          </h2>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 animate-in fade-in slide-in-from-left duration-1000">
            {settings.heroTitle.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {word === 'Quality' || word === 'Premium' ? <span className="text-red-500">{word}</span> : word}{' '}
                {i === 2 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed max-w-lg">
            {settings.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <button
              onClick={() => onNavigate?.('products')}
              className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-xl"
            >
              SEE OUR PRODUCTS
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => onNavigate?.('contact')}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-xl"
            >
              <MapPin size={20} className="text-red-500" />
              GET DIRECTIONS
            </button>
            <a
              href={`tel:${settings.phone}`}
              className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all hover:bg-slate-100 shadow-xl"
            >
              <Phone size={20} className="text-red-700" />
              CALL US NOW
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://picsum.photos/100/100?random=${i}`}
                  alt="Customer"
                  className="w-12 h-12 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <div>
              <p className="text-white font-bold">500+ Local Customers</p>
              <div className="flex text-yellow-500">
                {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
