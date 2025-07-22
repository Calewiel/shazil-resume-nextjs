'use client';
import React, { useState } from 'react';

export default function ContactCodeEditor() {
  const [copied, setCopied] = useState(false);

  const codeContent = `interface ContactInfo {
  name: "Shazil Sindhu";
  title: "Strategic SaaS Product Leader";
  email: "snsindhu@gmail.com";
  phone: "(804) 873-9174";
  linkedin: "in/shazilsindhu";
  framework: "S.C.A.L.E";
  location: "San Jose, CA";
  experience: "13+ years";
}

const myContact: ContactInfo = {
  name: "Shazil Sindhu",
  title: "Strategic SaaS Product Leader", 
  email: "snsindhu@gmail.com",
  phone: "(804) 873-9174",
  linkedin: "in/shazilsindhu",
  framework: "S.C.A.L.E",
  location: "San Jose, CA",
  experience: "13+ years"
};

// Click to connect! 🚀`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        width: '420px',
        height: '320px',
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
      }}
    >
      {/* Code Editor Window */}
      <div style={{
        background: '#1e1e1e',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        border: '1px solid #333',
      }}>
        {/* Title Bar */}
        <div style={{
          background: '#2d2d2d',
          padding: '8px 16px',
          borderBottom: '1px solid #333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#ff5f57',
            }}></div>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#ffbd2e',
            }}></div>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#28ca42',
            }}></div>
            <span style={{
              color: '#cccccc',
              fontSize: '12px',
              marginLeft: '8px',
            }}>
              📄 contact.ts
            </span>
          </div>
          <button
            onClick={handleCopy}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#cccccc',
              fontSize: '12px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              transition: 'background 0.2s',
            }}
          >
            {copied ? '✅ Copied!' : '📋 Copy'}
          </button>
        </div>
        
        {/* Code Content */}
        <div style={{
          padding: '16px',
          height: '264px',
          overflow: 'auto',
          fontSize: '11px',
          lineHeight: '1.5',
          color: '#d4d4d4',
        }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            <span style={{ color: '#569cd6' }}>interface</span>{' '}
            <span style={{ color: '#4ec9b0' }}>ContactInfo</span> {'{'}
            {'\n  '}
            <span style={{ color: '#9cdcfe' }}>name</span>: <span style={{ color: '#ce9178' }}>"Shazil Sindhu"</span>;
            {'\n  '}
            <span style={{ color: '#9cdcfe' }}>title</span>: <span style={{ color: '#ce9178' }}>"Strategic SaaS Product Leader"</span>;
            {'\n  '}
            <span 
              style={{ color: '#9cdcfe', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => handleContactClick('email', 'snsindhu@gmail.com')}
            >
              email
            </span>: <span style={{ color: '#ce9178' }}>"snsindhu@gmail.com"</span>;
            {'\n  '}
            <span 
              style={{ color: '#9cdcfe', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => handleContactClick('phone', '(804) 873-9174')}
            >
              phone
            </span>: <span style={{ color: '#ce9178' }}>"(804) 873-9174"</span>;
            {'\n  '}
            <span 
              style={{ color: '#9cdcfe', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => handleContactClick('linkedin', 'in/shazilsindhu')}
            >
              linkedin
            </span>: <span style={{ color: '#ce9178' }}>"in/shazilsindhu"</span>;
            {'\n  '}
            <span 
              style={{ color: '#9cdcfe', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => handleContactClick('website', 'scaleframework.notion.site')}
            >
              framework
            </span>: <span style={{ color: '#ce9178' }}>"S.C.A.L.E"</span>;
            {'\n  '}
            <span style={{ color: '#9cdcfe' }}>location</span>: <span style={{ color: '#ce9178' }}>"San Jose, CA"</span>;
            {'\n  '}
            <span style={{ color: '#9cdcfe' }}>experience</span>: <span style={{ color: '#ce9178' }}>"13+ years"</span>;
            {'\n'}
            {'}'}
            {'\n\n'}
            <span style={{ color: '#608b4e' }}>// Click any contact field to connect! 🚀</span>
          </pre>
        </div>
      </div>
    </div>
  );
}