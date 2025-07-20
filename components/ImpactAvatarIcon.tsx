import React, { useState } from "react";
import "./ImpactAvatarIcon.css";

const ImpactAvatarIcon = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className="impact-wrapper"
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      <div className="impact-avatar-container">
        {/* Avatar SVG */}
        <svg
          className="impact-avatar"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="avatar-body">
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
          <g className="impact-ripple">
            <circle cx="100" cy="170" r="0" className="ripple-circle" />
          </g>
        </svg>
      </div>
      {showInfo && (
        <div className="impact-info-box">
          <p>This icon represents impact. Hover to learn more!</p>
        </div>
      )}
    </div>
  );
};

export default ImpactAvatarIcon;
