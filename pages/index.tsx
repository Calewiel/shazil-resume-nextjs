// @ts-nocheck
'use client';
import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/Resume.module.css';
import Particles from '../components/Particles';
import SplashCursor from '../components/SplashCursor';
import TextType from '../components/TextType';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Hero statements that rotate
const heroStatements = [
  "I build delightful user experiences",
  "Scaled products from concept to $27M+ revenue", 
  "Led international teams across 3 countries",
  "Increased user engagement by 140%+",
  "Created frameworks adopted by enterprise teams",
  "Served 1M+ users with innovative solutions"
];

// Career impact stats
// Updated color palette for dark theme elegance
const impactStats = [
  { label: "Total Users Served", value: "1M+", icon: "👥", color: "#60a5fa" },
  { label: "Revenue Generated", value: "$27M+", icon: "💰", color: "#34d399" },
  { label: "Team Members Led", value: "20+", icon: "🚀", color: "#f87171" },
  { label: "Countries Worked", value: "3", icon: "🌍", color: "#fbbf24" },
  { label: "Years Experience", value: "13+", icon: "⏰", color: "#a78bfa" },
  { label: "Framework Created", value: "S.C.A.L.E", icon: "🎯", color: "#64748b" }
];


// Animated counter component
// @ts-nocheck
// Corrected AnimatedCounter component
const AnimatedCounter = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef({ value: 0 }); // Create a persistent object reference

  useEffect(() => {
    const isNumber = !isNaN(parseFloat(end.replace(/[^0-9.]/g, '')));
    
    if (isNumber) {
      const numericEnd = parseFloat(end.replace(/[^0-9.]/g, ''));
      
      // Reset the counter object
      countRef.current.value = 0;
      
      // Use gsap.to() instead of gsap.fromTo() for better reliability
      gsap.to(countRef.current, {
        value: numericEnd,
        duration: duration,
        ease: "power2.out",
        onUpdate: () => {
          const current = Math.floor(countRef.current.value);
          setCount(current);
        }
      });
    } else {
      // For non-numeric values like "S.C.A.L.E"
      setCount(end);
    }
  }, [end, duration]);

  const isNumber = !isNaN(parseFloat(end.replace(/[^0-9.]/g, '')));
  
  return (
    <span className={styles.animatedCounter}>
      {isNumber ? `${count}${suffix}` : count}
    </span>
  );
};


// Impact card component
const ImpactCard = ({ stat, index, style }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Entrance animation with stagger
    gsap.fromTo(
      card,
      {
        y: 60,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "back.out(1.7)",
        onComplete: () => setIsVisible(true)
      }
    );

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className={styles.impactCard}
      style={style}  // ← ADD THIS LINE
    >
      <div className={styles.cardIcon}>{stat.icon}</div>
      <div className={styles.cardValue}>
        {isVisible && (
          <AnimatedCounter 
            end={stat.value} 
            suffix={stat.value.includes('M') ? 'M+' : stat.value.includes('+') ? '+' : ''}
          />
        )}
      </div>
      <div className={styles.cardLabel}>{stat.label}</div>
    </div>
  );
};

export default function Resume() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Hero section entrance animation
    const hero = heroRef.current;
    if (!hero) return;

    gsap.fromTo(
      hero.children,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <>
      <Head>
        <title>Shazil Sindhu - Product Leader & Innovation Expert</title>
        <meta name="description" content="Product Manager with 13+ years experience, $27M+ revenue generated, serving 1M+ users across 3 countries" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.resumePage}>
        {/* Full-page background effects */}
        <Particles
          className={styles.particles}
          particleCount={60}
          particleSpread={8}
          speed={0.08}
          particleColors={['#ffffff', '#e0e7ff', '#c7d2fe']}
          alphaParticles={true}
          particleBaseSize={50}
          sizeRandomness={0.6}
        />
        <SplashCursor />

        {/* Page Content */}
        <main className={styles.pageContent}>
          {/* Hero Section */}
          <section className={styles.heroSection} ref={heroRef}>
            <h1 className={styles.mainTitle}>Shazil Sindhu</h1>
            
            <div className={styles.heroStatements}>
              <TextType
                text={heroStatements}
                className={styles.tagline}
                typingSpeed={60}
                pauseDuration={3000}
                deletingSpeed={40}
                loop={true}
                showCursor={true}
                cursorCharacter="✨"
                initialDelay={500}
              />
            </div>

            <p className={styles.subtitle}>
              Product Leader • Innovation Expert • Team Builder
            </p>
          </section>

          {/* Impact Stats Section */}
          <section className={styles.impactSection} ref={statsRef}>
            <div className={styles.sectionTitle}>
              <h2>🏆 Career Impact</h2>
              <p>Transforming ideas into measurable success</p>
            </div>
            
<div className={styles.statsGrid}>
  {impactStats.map((stat, index) => (
    <ImpactCard 
      key={stat.label} 
      stat={stat} 
      index={index}
      style={{ '--card-color': stat.color }}  // ← ADD THIS LINE
    />
  ))}
</div>

          </section>

          {/* Call to Action */}
          <section className={styles.ctaSection}>
            <button className={styles.exploreButton}>
              <span>Explore My Journey</span>
              <span className={styles.buttonIcon}>→</span>
            </button>
          </section>
        </main>
      </div>
    </>
  );
}
