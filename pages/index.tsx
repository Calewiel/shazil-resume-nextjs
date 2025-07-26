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
  { label: "Years Experience", value: "10+", icon: "⏰", color: "#a78bfa" },
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
  const journeyRef = useRef(null);
  const contactRef = useRef(null);

  // Smooth scroll function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

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

  // Career nodes interaction and timeline animation
  useEffect(() => {
    const timeline = document.querySelector(`.${styles.timelineLine}`);
    const careerNodes = document.querySelectorAll(`.${styles.careerNode}`);
    
    // Animate timeline on scroll
    if (timeline) {
      gsap.fromTo(timeline, 
        { 
          scaleX: 0,
          transformOrigin: 'left center'
        },
        {
          scaleX: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timeline,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animate nodes appearing after timeline
    careerNodes.forEach((node, index) => {
      gsap.fromTo(node,
        {
          y: 50,
          opacity: 0,
          scale: 0.5
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.3 + (index * 0.2),
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
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

      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
        node.removeEventListener('click', handleClick);
      };
    });
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
          
          {/* SECTION 1: Hero + Impact Stats */}
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

          {/* Scroll Button */}
          <section className={styles.ctaSection}>
            <button 
              className={styles.exploreButton}
              onClick={() => scrollToSection(journeyRef)}
            >
              ↓ Explore My Journey
              <span className={styles.buttonIcon}>↓</span>
            </button>
          </section>

          {/* SECTION 2: Career Journey */}
          <section className={styles.journeySection} ref={journeyRef}>
            <div className={styles.sectionTitle}>
              <h2>🎯 Career Journey</h2>
              <p>Hover over the nodes to explore my professional evolution</p>
            </div>
            
            <div className={styles.careerMap}>
              {/* Timeline Line */}
              <div className={styles.timelineLine}></div>
              
              {/* Education Node */}
              <div className={`${styles.careerNode} ${styles.educationNode}`}>
                <div className={styles.nodeIcon}>🎓</div>
                <div className={styles.nodeLabel}>Education</div>
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
                <div className={styles.nodeLabel}>BridgeBlue</div>
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
                  <div className={styles.popupAchievement}>
                    <span className={styles.icon}>💰</span> Generated <span className={styles.metric}>$17M+ revenue</span>
                  </div>
                  <div className={styles.popupAchievement}>
                    <span className={styles.icon}>🌍</span> Led <span className={styles.metric}>3-country international team</span>
                  </div>
                  <div className={styles.popupAchievement}>
                    <span className={styles.icon}>🚀</span> <span className={styles.metric}>40% velocity increase, 30% faster time-to-market</span>
                  </div>
                </div>
              </div>

              {/* Halfort Node */}
              <div className={`${styles.careerNode} ${styles.halfortNode}`}>
                <div className={styles.nodeIcon}>⚕️</div>
                <div className={styles.nodeLabel}>Halfort</div>
                <div className={`${styles.infoPopup} ${styles.halfortPopup}`}>
                  <div className={styles.popupDate}>July 2019 - Sept 2023</div>
                  <div className={styles.popupTitle}>Product Lead</div>
                  <div className={styles.popupCompany}>Halfort LLC • Virginia</div>
                  <div className={styles.badges}>
                    <span className={styles.badge}>💰 FinTech</span>
                    <span className={styles.badge}>🏥 HealthTech</span>
                    <span className={styles.badge}>📱 SaaS</span>
                  </div>
                  <div className={styles.popupHighlight}>
                    Payment platform: <span className={styles.metric}>90K MAUs</span>, <span className={styles.metric}>$10M revenue Year 1</span>
                  </div>
                  <div className={styles.popupAchievement}>
                    <span className={styles.icon}>💳</span> Patient payments up <span className={styles.metric}>150%</span>
                  </div>
                  <div className={styles.popupAchievement}>
                    <span className={styles.icon}>📈</span> <span className={styles.metric}>+35 NPS</span> improvement
                  </div>
                  <div className={styles.popupAchievement}>
                    <span className={styles.icon}>🎥</span> Telehealth: <span className={styles.metric}>50% YoY</span> engagement boost
                  </div>
                </div>
              </div>

              {/* Stukent Node */}
              <div className={`${styles.careerNode} ${styles.stukentNode}`}>
                <div className={styles.nodeIcon}>🚀</div>
                <div className={styles.nodeLabel}>Stukent</div>
                <div className={`${styles.infoPopup} ${styles.stukentPopup}`}>
                  <div className={styles.popupDate}>Oct 2019 - Present</div>
                  <div className={styles.popupTitle}>Group Product Manager</div>
                  <div className={styles.popupCompany}>Stukent • Idaho Falls</div>
                  <div className={styles.badges}>
                    <span className={styles.badge}>🤖 AI Innovation</span>
                    <span className={styles.badge}>📊 Analytics</span>
                    <span className={styles.badge}>🎓 EdTech</span>
                  </div>
                  <div className={styles.popupHighlight}>
                    AI algorithms: <span className={styles.metric}>140% engagement increase</span>
                  </div>
                  <div className={styles.popupAchievement}>
                    <span className={styles.icon}>🎯</span> <span className={styles.metric}>1M+ students, 30% YoY revenue growth</span>
                  </div>
                  <div className={styles.popupAchievement}>
                    <span className={styles.icon}>🚀</span><span className={styles.metric}>80% TAM expansion</span>
                  </div>
                  <div className={styles.popupAchievement}>
                    <span className={styles.icon}>👥</span><span className={styles.metric}>Led team of 20+</span>
                  </div>
                  <div className={styles.popupAchievement}>
                    <span className={styles.icon}>🐛</span><span className={styles.metric}>40% fewer issues after bugbash</span>
                  </div>
                </div>
              </div>

              {/* Framework Node */}
              <div className={`${styles.careerNode} ${styles.frameworkNode}`}>
                <div className={styles.nodeIcon}>🧠</div>
                <div className={styles.nodeLabel}>S.C.A.L.E</div>
                <div className={`${styles.infoPopup} ${styles.frameworkPopup}`}>
                  <div className={styles.popupDate}>2024 - Present</div>
                  <div className={styles.popupTitle}>S.C.A.L.E Framework</div>
                  <div className={styles.popupCompany}>Thought Leadership</div>
                  <div className={styles.badges}>
                    <span className={styles.badge}>🚀 Innovation</span>
                    <span className={styles.badge}>📚 Published</span>
                    <span className={styles.badge}>💡 Framework</span>
                  </div>
                  <div className={styles.popupHighlight}>
                    Comprehensive PM framework: Scalable, Customizable, Agile, Lean Execution
                  </div>
                  <div className={styles.popupAchievement}>
                    <span className={styles.icon}>📉</span> <span className={styles.metric}>20-45%</span> reduction in project delays
                  </div>
                  <div className={styles.popupAchievement}>
                    <span className={styles.icon}>📈</span> <span className={styles.metric}>15-30%</span> increase in on-time delivery
                  </div>
                  <div className={styles.popupAchievement}>
                    <span className={styles.icon}>🌍</span> Adopted across multiple organizations
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: Contact */}
          <section className={styles.contactSection} ref={contactRef}>
            <div className={styles.sectionTitle}>
              <h2>💻 Let's Build Something Together</h2>
              <p>Ready to transform your product vision into reality?</p>
            </div>
            
            <div className={styles.contactContent}>
              <div className={styles.codeEditor}>
                <div className={styles.editorHeader}>
                  <div className={styles.editorDots}>
                    <span className={styles.dot} style={{background: '#ff5f56'}}></span>
                    <span className={styles.dot} style={{background: '#ffbd2e'}}></span>
                    <span className={styles.dot} style={{background: '#27ca3f'}}></span>
                  </div>
                  <div className={styles.editorTitle}>contact.js</div>
                </div>
                <div className={styles.editorContent}>
                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>1</span>
                    <span className={styles.codeKeyword}>const contact</span> <span className={styles.codeVariable}></span> = {'{'}
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>2</span>
                    &nbsp;&nbsp;<span className={styles.codeProperty}>email</span>: <span className={styles.codeString}>"snsindhu@gmail.com"</span>,
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>3</span>
                    &nbsp;&nbsp;<span className={styles.codeProperty}>phone</span>: <span className={styles.codeString}>"(804) 873-9174"</span>,
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>4</span>
                    &nbsp;&nbsp;<span className={styles.codeProperty}>linkedin</span>: <span className={styles.codeString}>"in/shazilsindhu"</span>,
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>5</span>
                    &nbsp;&nbsp;<span className={styles.codeProperty}>framework</span>: <span className={styles.codeString}>"scaleframework.notion.site"</span>
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>6</span>
                    {'}'};
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>7</span>
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>8</span>
                    <span className={styles.codeComment}>// Ready to scale your next big idea?</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.contactButtons}>
  <a href="mailto:snsindhu@gmail.com" className={styles.contactButton}>
    📧 Send Email
  </a>
  <a href="tel:(804) 873-9174" className={styles.contactButton}>
    📱 Call Me
  </a>
  <a href="https://linkedin.com/in/shazilsindhu" target="_blank" rel="noopener noreferrer" className={styles.contactButton}>
    💼 LinkedIn
  </a>
  <a href="/Shazil-Sindhu-Product-Manager-Resume.pdf" download className={styles.contactButton}>
    📄 Download Resume
  </a>
</div>
            </div>
          </section>
          
        </div>
      </div>
    </>
  );
}