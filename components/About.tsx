
import React from 'react';
import { ShieldCheck, Truck, Clock, Award, Target, Eye } from 'lucide-react';
import { WebsiteSettings } from '../types';

interface AboutProps {
  settings: WebsiteSettings;
}

const About: React.FC<AboutProps> = ({ settings }) => {
  const values = [
    {
      icon: <ShieldCheck className="text-red-700" size={32} />,
      title: "Quality Guaranteed",
      desc: "We strictly follow health standards ensuring you get only the best, safest meat."
    },
    {
      icon: <Truck className="text-red-700" size={32} />,
      title: "Wholesale Supply",
      desc: "Supplying local restaurants, hotels, and schools with consistent bulk orders."
    },
    {
      icon: <Clock className="text-red-700" size={32} />,
      title: "Daily Freshness",
      desc: "Our stock is replenished daily from trusted local farmers in the region."
    },
    {
      icon: <Award className="text-red-700" size={32} />,
      title: "Expert Butchers",
      desc: "Decades of experience in precision cutting and traditional meat curing."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="relative lg:sticky lg:top-28">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&q=80&w=800" 
              alt="Butcher at work" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-red-800 text-white p-8 rounded-3xl shadow-xl hidden sm:block max-w-xs">
            <p className="text-3xl font-black mb-1">10+</p>
            <p className="text-sm font-bold uppercase tracking-wider">Years of Service in Bulawayo</p>
          </div>
        </div>

        <div className="space-y-12">
          <div>
            <h2 className="text-red-800 font-bold tracking-widest uppercase mb-4">Our Heritage</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              The Butcher Shop Bulawayo Relies On.
            </h3>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              {settings.name} has been a cornerstone of the Bulawayo community for over a decade. We believe that good food starts with good ingredients.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <Target className="text-red-700 mb-4" size={24} />
                <h4 className="font-bold text-slate-900 mb-2">Our Mission</h4>
                <p className="text-slate-500 text-sm">To provide the freshest, highest quality meat products to the Bulawayo community at fair prices, supporting local agriculture and healthy living.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <Eye className="text-red-700 mb-4" size={24} />
                <h4 className="font-bold text-slate-900 mb-2">Our Vision</h4>
                <p className="text-slate-500 text-sm">To be the most trusted meat supplier in Zimbabwe, known for innovation in butchery and excellence in customer service.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {values.map((v, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0">{v.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{v.title}</h4>
                    <p className="text-slate-500 text-sm leading-snug">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-black text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">Business Hours</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Monday - Friday</span>
                <span className="font-bold text-slate-900">{settings.hours.weekday}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Saturday</span>
                <span className="font-bold text-slate-900">{settings.hours.saturday}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Sunday</span>
                <span className="font-bold">{settings.hours.sunday}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
