
import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { WebsiteSettings } from '../types';

interface ContactProps {
  settings: WebsiteSettings;
}

const Contact: React.FC<ContactProps> = ({ settings }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 mb-4">Visit Our Shop</h2>
        <div className="w-20 h-1.5 bg-red-700 mx-auto mb-6"></div>
        <p className="text-slate-600 max-w-2xl mx-auto">
          We are conveniently located in the heart of Bulawayo. Drop by for the freshest cuts or send us a message for wholesale inquiries.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          <div className="bg-[#FAF9F6] p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-800 mb-4">
              <MapPin size={24} />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Our Address</h4>
            <p className="text-slate-600 text-sm">{settings.address}</p>
          </div>

          <div className="bg-[#FAF9F6] p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-800 mb-4">
              <Phone size={24} />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Call Us</h4>
            <p className="text-slate-600 text-sm">{settings.phone}</p>
            <p className="text-slate-600 text-sm mt-1">WhatsApp: {settings.whatsapp}</p>
          </div>

          <div className="bg-[#FAF9F6] p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-800 mb-4">
              <Mail size={24} />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Email Us</h4>
            <p className="text-slate-600 text-sm">{settings.email}</p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 h-full">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">Your Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-red-800 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder={settings.phone}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-red-800 outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">How can we help?</label>
                <textarea 
                  rows={4} 
                  placeholder="I'm interested in wholesale supplies for my restaurant..." 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-red-800 outline-none transition-all"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <button 
                  type="submit"
                  className="w-full bg-red-800 hover:bg-red-900 text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg"
                >
                  SEND MESSAGE
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map Embed */}
      <div className="mt-16 h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.483492705572!2d28.5833333!3d-20.1500000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1eb5540000000000%3A0x0!2zNjUgSm9zaWFoIFRvbmdvZ2FyYSBSZCwgQnVsYXdheW8sIFppbWJhYndl!5e0!3m2!1sen!2szw!4v1700000000000!5m2!1sen!2szw"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Jumbo Meat Suppliers Location"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
