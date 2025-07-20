'use client';
import { useState } from 'react';
import styles from '../styles/ContactLanyard.module.css';

const ContactLanyard = () => {
  const [isHovered, setIsHovered] = useState(false);

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
            <h3>Contact Info</h3>
            <div className={styles.contactItem}>
              <span className={styles.icon}>📧</span>
              <span>snsindhu@gmail.com</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.icon}>📱</span>
              <span>(804) 873-9174</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.icon}>💼</span>
              <span>in/shazilsindhu</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.icon}>🌐</span>
              <span>scaleframework.notion.site</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLanyard;