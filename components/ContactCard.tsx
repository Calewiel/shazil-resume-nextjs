'use client';
import React from "react";

interface ContactCardProps {
  fromColor?: string;
  viaColor?: string;
  toColor?: string;
}

export default function ContactCard({
  fromColor = "#4158D0",
  viaColor = "#C850C0", 
  toColor = "#FFCC70",
}: ContactCardProps) {
  
  const handleContactClick = (type: string, value: string) => {
    switch(type) {
      case 'email':
        window.open(`mailto:${value}`, '_blank');
        break;
      case 'phone':
        window.open(`tel:${value.replace(/\D/g, '')}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://linkedin.com/${value}`, '_blank');
        break;
      case 'website':
        window.open(`https://${value}`, '_blank');
        break;
    }
  };

  return (
    <div 
      className="fixed top-5 right-5 z-[9999]"
      style={{ fontFamily: 'Nunito, Inter, sans-serif' }}
    >
      <div
        className="rounded-3xl bg-gradient-to-r p-0.5 hover:shadow-glow hover:brightness-150 cursor-pointer transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(to right, ${fromColor}, ${viaColor}, ${toColor})`,
        }}
      >
        <div className="flex h-80 w-64 flex-col gap-3 rounded-3xl bg-slate-900 p-5">
          {/* Profile Photo - Placeholder */}
<div className="flex justify-center mb-2">
  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
    S
  </div>
</div>
          
          {/* Name */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-1">Shazil Sindhu</h3>
            <p className="text-sm text-gray-300 font-medium">Strategic SaaS Product Leader</p>
          </div>
          
          {/* Contact Details */}
          <div className="flex-1 space-y-3 mt-2">
            {/* Email */}
            <div 
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => handleContactClick('email', 'snsindhu@gmail.com')}
            >
              <span className="text-blue-400">📧</span>
              <span className="text-xs text-gray-200 truncate">snsindhu@gmail.com</span>
            </div>
            
            {/* Phone */}
            <div 
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => handleContactClick('phone', '(804) 873-9174')}
            >
              <span className="text-green-400">📱</span>
              <span className="text-xs text-gray-200">(804) 873-9174</span>
            </div>
            
            {/* LinkedIn */}
            <div 
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => handleContactClick('linkedin', 'in/shazilsindhu')}
            >
              <span className="text-blue-500">💼</span>
              <span className="text-xs text-gray-200">in/shazilsindhu</span>
            </div>
            
            {/* S.C.A.L.E Framework */}
            <div 
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => handleContactClick('website', 'scaleframework.notion.site')}
            >
              <span className="text-purple-400">🌐</span>
              <span className="text-xs text-gray-200">S.C.A.L.E Framework</span>
            </div>
          </div>
          
          {/* Contact Me Button */}
          <button 
            className="mt-3 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold py-2 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            onClick={() => handleContactClick('linkedin', 'in/shazilsindhu')}
          >
            ✨ Let's Connect!
          </button>
        </div>
      </div>
    </div>
  );
}