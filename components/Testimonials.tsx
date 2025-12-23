
import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-red-800 font-bold tracking-widest uppercase mb-4">Customer Stories</h2>
        <h3 className="text-4xl font-black text-slate-900">What People are Saying</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t) => (
          <div key={t.id} className="bg-[#FAF9F6] p-8 rounded-3xl relative">
            <Quote className="text-red-100 absolute top-6 right-6" size={48} />
            <p className="text-slate-600 italic mb-8 relative z-10 leading-relaxed">
              "{t.content}"
            </p>
            <div className="flex items-center gap-4">
              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                <p className="text-red-700 text-xs font-bold uppercase tracking-wider">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
