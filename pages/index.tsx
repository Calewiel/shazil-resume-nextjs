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
const impactStats = [
  { label: "Total Users Served", value: "1M+", icon: "👥", color: "#60a5fa" },
  { label: "Revenue Generated", value: "$27M+", icon: "💰", color: "#34d399" },
  { label: "Team Members Led", value: "20+", icon: "🚀", color: "#f87171" },
  { label: "Countries Worked", value: "3", icon: "🌍", color: "#fbbf24" },
  { label: "Years Experience", value: "13+", icon: "⏰", color: "#a78bfa" },
  { label: "Framework Created", value: "S.C.A.L.E", icon: "🎯", color: "#64748b" }
];

// Animated counter component
const AnimatedCounter = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    const isNumber = !isNaN(parseFloat(end.replace(/[^0-9.]/g, '')));
    
    if (isNumber) {
      const numericEnd = parseFloat(end.replace(/[^0-9.]/g, ''));
      
      countRef.current.value = 0;
      
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
      setCount(end);
    }
  }, [end, duration]);

  const isNumber = !isNaN(parseFloat(end.replace(/[^0-9.]/g, '')));
  
  return (
    <span className={styles.animatedCounter}>
      {isNumber ? count + suffix : end}
    </span>
  );
};

// Stat card component
const StatCard = ({ stat }) => {
  return (
    <div 
      className={styles.impactCard}
      style={{ '--card-color': stat.color }}
    >
      <div className={styles.cardIcon}>{stat.icon}</div>
      <div className={styles.cardValue}>
        {stat.value.includes('M') || stat.value.includes('+') ? (
          <AnimatedCounter 
            end={stat.value} 
            suffix={stat.value.includes('M') ? 'M+' : stat.value.includes('+') ? '+' : ''}
          />
        ) : (
          stat.value
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

  useEffect(() => {
    const stats = statsRef.current;
    if (!stats) return;

    gsap.fromTo(
      stats.children,
      {
        y: 50,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: stats,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <>
      <Head>
        <title>Shazil Sindhu - Product Leader</title>
        <meta name="description" content="Strategic SaaS Product Leader specializing in AI-driven growth and 0→1 execution" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Nunito:wght@600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <SplashCursor />
      
      <div className={styles.resumePage}>
        {/* Solid Background Layer */}
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%", 
          height: "100%",
          background: "#1a1a2e",
          zIndex: 1
        }} />
        
        {/* Particle Background */}
        <div className={styles.particles}>
          <Particles 
            particleColors={["#ffffff", "#667eea", "#764ba2"]}
            particleCount={300}
            particleSpread={15}
            speed={0.3}
            particleBaseSize={80}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        
        {/* Main Content */}
        <div className={styles.pageContent}>
          {/* Hero Section */}
          <section className={styles.heroSection} ref={heroRef}>
            <h1 className={styles.mainTitle}>Shazil Nazir Sindhu</h1>
            
            <div className={styles.heroStatements}>
              <div className={styles.tagline}>
                <TextType 
                  text={heroStatements}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                  loop={true}
                />
              </div>
            </div>
            
            <div className={styles.subtitle}>
              📧 snsindhu@gmail.com | 📱 (804) 873-9174 | 💼 in/shazilsindhu | 🌐 scaleframework.notion.site
            </div>
          </section>

          {/* Impact Section */}
          <section className={styles.impactSection}>
            <div className={styles.sectionTitle}>
              <h2>🏆 Career Impact</h2>
              <p>Transforming ideas into measurable outcomes across multiple industries</p>
            </div>
            
            <div className={styles.statsGrid} ref={statsRef}>
              {impactStats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className={styles.ctaSection}>
            <button 
              className={styles.exploreButton}
              onClick={() => {
                // Add navigation logic here
                console.log('Explore button clicked');
              }}
            >
              Explore My Journey
              <span className={styles.buttonIcon}>→</span>
            </button>
          </section>
        </div>
      </div>
    </>
  );
}