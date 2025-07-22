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
      style={style}
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
    let cleanups = [];
    const careerNodes = document.querySelectorAll(`.${styles.careerNode}`);
    
    careerNodes.forEach((node) => {
      const handleMouseEnter = () => {
        node.style.zIndex = '1000';
        node.style.transform = 'scale(1.05)';
        const popup = node.querySelector(`.${styles.infoPopup}`);
        if (popup) {
          popup.style.opacity = '1';
          popup.style.visibility = 'visible';
        }
      };

      const handleMouseLeave = () => {
        node.style.zIndex = '10';
        node.style.transform = 'scale(1)';
        const popup = node.querySelector(`.${styles.infoPopup}`);
        if (popup) {
          popup.style.opacity = '0';
          popup.style.visibility = 'hidden';
        }
      };

      const handleClick = (e) => {
        e.preventDefault();
        const popup = node.querySelector(`.${styles.infoPopup}`);
        
        careerNodes.forEach((otherNode) => {
          if (otherNode !== node) {
            const otherPopup = otherNode.querySelector(`.${styles.infoPopup}`);
            if (otherPopup) {
              otherPopup.style.opacity = '0';
              otherPopup.style.visibility = 'hidden';
            }
          }
        });

        if (popup) {
          const isVisible = popup.style.opacity === '1';
          popup.style.opacity = isVisible ? '0' : '1';
          popup.style.visibility = isVisible ? 'hidden' : 'visible';
        }
      };

      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);
      node.addEventListener('click', handleClick);

      cleanups.push(() => {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
        node.removeEventListener('click', handleClick);
      });
    });

    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
  }, []);

  return (
    <>
      <Head>
        <title>Shazil Sindhu - Career Timeline</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Head>

      <SplashCursor />
      
      <div className={styles.body}>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#1a1a2e',
          zIndex: 1
        }}>
          <Particles
            particleColors={['#ffffff', '#667eea', '#764ba2']}
            particleCount={300}
            particleSpread={15}
            speed={0.3}
            particleBaseSize={80}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        <div className={styles.header}>
          <h1>Shazil Nazir Sindhu</h1>
          <div className={styles.tagline}>
            Strategic SaaS Product Leader | AI-Driven Growth | 0→1 Execution
          </div>
          <div style={{
            fontSize: '1.2em',
            marginTop: '20px',
            marginBottom: '10px',
            color: '#ffffff'
          }}>
            <TextType
              text={[
                "Hello, I am Shazil.",
                "Welcome to my interactive resume",
                "Exploring innovation through product leadership",
                "Building the future, one product at a time"
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              loop={true}
            />
          </div>
          <div className={styles.contact}>
            📧 snsindhu@gmail.com | 📱 (804) 873-9174 | 💼 in/shazilsindhu | 🌐 scaleframework.notion.site
          </div>
        </div>

        <div className={styles.careerMap}>
          {/* Education Node */}
          <div className={`${styles.careerNode} ${styles.educationNode}`}>
            <div className={styles.nodeIcon}>🎓</div>
            <div className={`${styles.infoPopup} ${styles.educationPopup}`}>
              <div className={styles.popupDate}>2007 - 2011</div>
              <div className={styles.popupTitle}>Foundation</div>
              <div className={styles.popupCompany}>Lahore School of Economics</div>
              <div className={styles.popupAchievement}>
                <span className={styles.icon}>🎓</span> BBA (Hons) - Marketing & Finance
              </div>
              <div className={styles.popupAchievement}>
                <span className={styles.icon}>📊</span> Built strategic & analytical foundations
              </div>
              <div className={styles.popupAchievement}>
                <span className={styles.icon}>🌟</span> Honors graduate
              </div>
            </div>
          </div>

          {/* BridgeBlue Node */}
          <div className={`${styles.careerNode} ${styles.bridgeblueNode}`}>
            <div className={styles.nodeIcon}>🌏</div>
            <div className={`${styles.infoPopup} ${styles.bridgebluePopup}`}>
              <div className={styles.popupDate}>June 2015 - July 2019</div>
              <div className={styles.popupTitle}>Lead Product Manager</div>
              <div className={styles.popupCompany}>AMS BridgeBlue • Sydney, Australia</div>
              <div className={styles.badges}>
                <span className={styles.badge}>🎓 EdTech</span>
                <span className={styles.badge}>🌏 International</span>
                <span className={styles.badge}>💼 B2B</span>
              </div>
              <div className={styles.popupHighlight}>
                Cross-university portal: <span className={styles.metric}>230% application increase</span>
              </div>
              <div className={styles.popupHighlight}>
                Data insights platform: <span className={styles.metric}>140% engagement boost</span>
              </div>
              <div className={styles.popupHighlight}>
                Mobile-first redesign: <span className={styles.metric}>65% mobile adoption</span>
              </div>
            </div>
          </div>

          {/* Halfort Node */}
          <div className={`${styles.careerNode} ${styles.halfortNode}`}>
            <div className={styles.nodeIcon}>🛠️</div>
            <div className={`${styles.infoPopup} ${styles.halfortPopup}`}>
              <div className={styles.popupDate}>August 2019 - September 2021</div>
              <div className={styles.popupTitle}>Senior Product Manager</div>
              <div className={styles.popupCompany}>Halfort • Richmond, VA</div>
              <div className={styles.badges}>
                <span className={styles.badge}>🏗️ Construction</span>
                <span className={styles.badge}>🛠️ SaaS</span>
                <span className={styles.badge}>📊 Analytics</span>
              </div>
              <div className={styles.popupHighlight}>
                MVP to market leader: <span className={styles.metric}>$2.1M revenue</span>
              </div>
              <div className={styles.popupHighlight}>
                Advanced analytics: <span className={styles.metric}>2000+ active users</span>
              </div>
              <div className={styles.popupHighlight}>
                User experience: <span className={styles.metric}>4.7/5 satisfaction</span>
              </div>
            </div>
          </div>

          {/* Stukent Node */}
          <div className={`${styles.careerNode} ${styles.stukentNode}`}>
            <div className={styles.nodeIcon}>🚀</div>
            <div className={`${styles.infoPopup} ${styles.stukentPopup}`}>
              <div className={styles.popupDate}>October 2021 - Present</div>
              <div className={styles.popupTitle}>VP of Product</div>
              <div className={styles.popupCompany}>Stukent • Idaho Falls, ID</div>
              <div className={styles.badges}>
                <span className={styles.badge}>🎓 EdTech</span>
                <span className={styles.badge}>🤖 AI/ML</span>
                <span className={styles.badge}>📊 Analytics</span>
              </div>
              <div className={styles.popupHighlight}>
                AI-powered platform: <span className={styles.metric}>$25M ARR growth</span>
              </div>
              <div className={styles.popupHighlight}>
                Student engagement: <span className={styles.metric}>800K+ learners</span>
              </div>
              <div className={styles.popupHighlight}>
                Product suite: <span className={styles.metric}>15+ integrated tools</span>
              </div>
            </div>
          </div>

          {/* S.C.A.L.E Framework Node */}
          <div className={`${styles.careerNode} ${styles.frameworkNode}`}>
            <div className={styles.nodeIcon}>🎯</div>
            <div className={`${styles.infoPopup} ${styles.frameworkPopup}`}>
              <div className={styles.popupDate}>2023 - Present</div>
              <div className={styles.popupTitle}>S.C.A.L.E Framework</div>
              <div className={styles.popupCompany}>Product Management Innovation</div>
              <div className={styles.popupHighlight}>
                <strong>S</strong>trategy - Vision & roadmapping
              </div>
              <div className={styles.popupHighlight}>
                <strong>C</strong>ustomer - User-centric design
              </div>
              <div className={styles.popupHighlight}>
                <strong>A</strong>nalytics - Data-driven decisions
              </div>
              <div className={styles.popupHighlight}>
                <strong>L</strong>eadership - Team collaboration
              </div>
              <div className={styles.popupHighlight}>
                <strong>E</strong>xecution - Delivery excellence
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className={styles.legend}>
            <h3>🎯 Career Impact</h3>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total Users Served</span>
              <span className={styles.statValue}>1M+</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Revenue Generated</span>
              <span className={styles.statValue}>$27M+</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Team Members Led</span>
              <span className={styles.statValue}>20+</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Countries Worked</span>
              <span className={styles.statValue}>3</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Years Experience</span>
              <span className={styles.statValue}>13+</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Framework Created</span>
              <span className={styles.statValue}>S.C.A.L.E</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}