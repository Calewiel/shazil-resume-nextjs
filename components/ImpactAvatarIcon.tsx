import React, { useState } from "react";
import styles from '../styles/ImpactAvatarIcon.module.css';

const ImpactAvatarIcon = () => {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <div
      className={styles.impactWrapper}
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      <div className={styles.impactAvatarContainer}>
        {/* Avatar SVG */}
        <svg
          className={styles.impactAvatar}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className={styles.avatarBody}>
            <circle cx="100" cy="100" r="50" fill="#333" />
            <text
              x="100"
              y="110"
              textAnchor="middle"
              fill="#fff"
              fontSize="20"
              fontFamily="Arial"
            >
              PM
            </text>
          </g>
          <g className={styles.impactRipple}>
            <circle cx="100" cy="170" r="0" className={styles.rippleCircle} />
          </g>
        </svg>
      </div>
      {showInfo && (
        <div className={styles.impactInfoBox}>
          <p>Strategic Product Leader | Framework Creator</p>
        </div>
      )}
    </div>
  );
};

export default ImpactAvatarIcon;
