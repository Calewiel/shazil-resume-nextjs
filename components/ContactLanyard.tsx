'use client';
import { useState } from 'react';
import styles from '../styles/ContactLanyard.module.css';

const ContactLanyard = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleContactClick = (type: string, value: string) => {
    switch(type) {
      case 'email':
        window.open(`mailto:${value}`, '_blank');
        break;
      case 'phone':
        window.open(`tel:${value.replace(/\D/g, '')}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://${value}`, '_blank');
        break;
      case 'website':
        window.open(`https://${value}`, '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.lanyardWrapper}>
      <div 
        className={styles.lanyardContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Lanyard String */}
        <div className={styles.lanyardString}></div>
        
        {/* Contact Card */}
        <div className={`${styles.contactCard} ${isHovered ? styles.swing : ''}`}>
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Let's Connect! 🚀</div>
              <div className={styles.cardSubtitle}>Shazil Sindhu</div>
            </div>
            
            <div 
              className={styles.contactItem}
              onClick={() => handleContactClick('email', 'snsindhu@gmail.com')}
            >
              <span className={styles.icon}>📧</span>
              <div className={styles.contactDetails}>
                <div className={styles.contactLabel}>Email</div>
                <div className={styles.contactValue}>snsindhu@gmail.com</div>
              </div>
            </div>
            
            <div 
              className={styles.contactItem}
              onClick={() => handleContactClick('phone', '(804) 873-9174')}
            >
              <span className={styles.icon}>📱</span>
              <div className={styles.contactDetails}>
                <div className={styles.contactLabel}>Mobile</div>
                <div className={styles.contactValue}>(804) 873-9174</div>
              </div>
            </div>
            
            <div 
              className={styles.contactItem}
              onClick={() => handleContactClick('linkedin', 'www.linkedin.com/in/shazilsindhu')}
            >
              <span className={styles.icon}>💼</span>
              <div className={styles.contactDetails}>
                <div className={styles.contactLabel}>LinkedIn</div>
                <div className={styles.contactValue}>in/shazilsindhu</div>
              </div>
            </div>
            
            <div 
              className={styles.contactItem}
              onClick={() => handleContactClick('website', 'scaleframework.notion.site')}
            >
              <span className={styles.icon}>🌐</span>
              <div className={styles.contactDetails}>
                <div className={styles.contactLabel}>Framework</div>
                <div className={styles.contactValue}>S.C.A.L.E</div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.footerText}>Click to connect!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLanyard;