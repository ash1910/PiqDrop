import React from 'react';
import Svg, { Path, G, ClipPath, Rect } from 'react-native-svg';

interface FacebookIconProps {
  size?: number;
}

export const FacebookIcon: React.FC<FacebookIconProps> = ({ size = 32 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 33 32" fill="none">
      <G clipPath="url(#clip0_73_1161)">
        <Path
          d="M32.5 16C32.5 7.16341 25.3366 -2.47955e-05 16.5 -2.47955e-05C7.66344 -2.47955e-05 0.5 7.16341 0.5 16C0.5 23.986 6.35097 30.6053 14 31.8056V20.625H9.9375V16H14V12.475C14 8.46498 16.3887 6.24998 20.0434 6.24998C21.794 6.24998 23.625 6.56248 23.625 6.56248V10.5H21.6074C19.6198 10.5 19 11.7333 19 12.9986V16H23.4375L22.7281 20.625H19V31.8056C26.649 30.6053 32.5 23.986 32.5 16Z"
          fill="#1877F2"
        />
        <Path
          d="M22.7281 20.625L23.4375 16H19V12.9987C19 11.7333 19.6198 10.5 21.6074 10.5H23.625V6.5625C23.625 6.5625 21.794 6.25 20.0434 6.25C16.3887 6.25 14 8.465 14 12.475V16H9.9375V20.625H14V31.8056C14.8146 31.9334 15.6495 32 16.5 32C17.3505 32 18.1854 31.9334 19 31.8056V20.625H22.7281Z"
          fill="white"
        />
      </G>
      <ClipPath id="clip0_73_1161">
        <Rect width={32} height={32} fill="white" x={0.5} />
      </ClipPath>
    </Svg>
  );
}; 