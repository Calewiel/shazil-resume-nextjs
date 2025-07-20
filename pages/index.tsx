'use client';
import { useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Resume.module.css';
import AnimatedBackground from '../components/AnimatedBackground';
import ImpactAvatarIcon from '../components/ImpactAvatarIcon';

export default function Resume() {
  useEffect(() => {
    const nodes = document.querySelectorAll(`.${styles.careerNode}`);
    
    nodes.forEach(node => {
      const htmlNode = node as HTMLElement;
      
      // Hover effects and popup control
      const handleMouseEnter = () => {
        htmlNode.style.zIndex = '1000';
        htmlNode.style.transform = 'scale(1.05)';
        
        // Show popup on hover
        const popup = htmlNode.querySelector(`.${styles.infoPopup}`) as HTMLElement;
        if (popup) {
          popup.style.opacity = '1';
          popup.style.visibility = 'visible';
        }
      };
      
      const handleMouseLeave = () => {
        htmlNode.style.zIndex = '10';
        htmlNode.style.transform = 'scale(1)';
        
        // Hide popup when leaving
        const popup = htmlNode.querySelector(`.${styles.infoPopup}`) as HTMLElement;
        if (popup) {
          popup.style.opacity = '0';
          popup.style.visibility = 'hidden';
        }
      };

      const handleClick = (e: Event) => {
        e.preventDefault();
        const popup = htmlNode.querySelector(`.${styles.infoPopup}`) as HTMLElement;
        
        // Close other popups
        nodes.forEach(otherNode => {
          if (otherNode !== htmlNode) {
            const otherPopup = otherNode.querySelector(`.${styles.infoPopup}`) as HTMLElement;
            if (otherPopup) {
              otherPopup.style.opacity = '0';
              otherPopup.style.visibility = 'hidden';
            }
          }
        });
        
        // Toggle current popup
        if (popup) {
          const isVisible = popup.style.opacity === '1';
          popup.style.opacity = isVisible ? '0' : '1';
          popup.style.visibility = isVisible ? 'hidden' : 'visible';
        }
      };

      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);
      node.addEventListener('click', handleClick);

      // Store cleanup functions
      (node as any)._cleanup = () => {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
        node.removeEventListener('click', handleClick);
      };
    });

    // Cleanup function
    return () => {
      nodes.forEach(node => {
        if ((node as any)._cleanup) {
          (node as any)._cleanup();
        }
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title>Shazil Sindhu - Career Timeline</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Head>
      
      <div className={styles.body}>
        <AnimatedBackground/>
        <div className={styles.header}>
          <h1>Shazil Nazir Sindhu</h1>
          <div className={styles.tagline}>Strategic SaaS Product Leader | AI-Driven Growth | 0→1 Execution</div>
          <div className={styles.contact}>
            📧 snsindhu@gmail.com | 📱 (804) 873-9174 | 💼 in/shazilsindhu | 🌐 scaleframework.notion.site
          </div>
        </div>

        <div className={styles.careerMap}>
          {/* Career Path SVG */}
  <svg 
  width="100%" 
  height="100%" 
  style={{
    position: 'absolute', 
    top: 0, 
    left: 0,
    pointerEvents: 'none',  /* ← Add this */
    zIndex: 1               /* ← Add this */
  }}
>
  <path 
    className={styles.path} 
    d="M 120 540 Q 180 520 310 460 Q 450 380 590 330 Q 720 260 890 210 Q 1000 170 1180 140" 
    stroke="rgba(255,255,255,0.3)"  /* ← Make it more subtle */
    strokeWidth="2"                  /* ← Make it thinner */
    fill="none"
  />
</svg>

{/* Animated Icon in Center */}
  <div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 50
  }}>
    <ImpactAvatarIcon />
  </div>
          
          {/* Education Node */}
          <div className={`${styles.careerNode} ${styles.educationNode}`}>
            <div className={styles.nodeIcon}>
              🎓
            </div>
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

          {/* AMS BridgeBlue Node */}
          <div className={`${styles.careerNode} ${styles.bridgeblueNode}`}>
            <div className={styles.nodeIcon}>
              🌏
            </div>
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
                Cross-university portal: <span className={styles.metric}>230% application increase</span>, <span className={styles.metric}>90% satisfaction</span>
              </div>
              <div className={styles.popupAchievement}>
                <span className={styles.icon}>💰</span> Generated <span className={styles.metric}>$17M+ revenue</span> via loyalty program
              </div>
              <div className={styles.popupAchievement}>
                <span className={styles.icon}>🌍</span> Led <span className={styles.metric}>3-country</span> international team
              </div>
              <div className={styles.popupAchievement}>
                <span className={styles.icon}>🚀</span> <span className={styles.metric}>40% velocity</span> increase, <span className={styles.metric}>30%</span> faster time-to-market
              </div>
            </div>
          </div>

          {/* Halfort Node */}
          <div className={`${styles.careerNode} ${styles.halfortNode}`}>
            <div className={styles.nodeIcon}>
              ⚕️
            </div>
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
            <div className={styles.nodeIcon}>
              🚀
            </div>
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
                AI algorithms: <span className={styles.metric}>140% engagement</span> increase
              </div>
              <div className={styles.popupAchievement}>
                <span className={styles.icon}>🎯</span> <span className={styles.metric}>1M+ students</span>, <span className={styles.metric}>30% YoY</span> revenue growth
              </div>
              <div className={styles.popupAchievement}>
                <span className={styles.icon}>🚀</span> Google Classroom: <span className={styles.metric}>80%</span> market expansion
              </div>
              <div className={styles.popupAchievement}>
                <span className={styles.icon}>👥</span> Led <span className={styles.metric}>20+ team</span>, <span className={styles.metric}>50%</span> less delays
              </div>
              <div className={styles.popupAchievement}>
                <span className={styles.icon}>🐛</span> Bug bash: <span className={styles.metric}>40%</span> fewer issues
              </div>
            </div>
          </div>

          {/* S.C.A.L.E Framework Node */}
          <div className={`${styles.careerNode} ${styles.frameworkNode}`}>
            <div className={styles.nodeIcon}>
              🧠
            </div>
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

          {/* Legend */}
          <div className={styles.legend}>
            <h3>🎯 Career Journey</h3>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.educationColor}`}></div>
              <span>Education & Foundation</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.bridgeblueColor}`}></div>
              <span>International Experience</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.halfortColor}`}></div>
              <span>HealthTech Leadership</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.stukentColor}`}></div>
              <span>AI & EdTech Innovation</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.frameworkColor}`}></div>
              <span>Thought Leadership</span>
            </div>
          </div>

          {/* Stats Panel */}
          <div className={styles.statsPanel}>
            <h3>🏆 Career Impact</h3>
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
