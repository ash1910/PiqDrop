import React from 'react';
import { Svg, Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface SuccessIconProps {
  size?: number;
  color?: string;
}

export const SuccessIcon: React.FC<SuccessIconProps> = ({ size = 40, color = '#55B086' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Rect width={size} height={size} rx="20" fill={color} fillOpacity="0.08" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.3917 11.6666H23.6167C26.4417 11.6666 28.3334 13.6499 28.3334 16.5999V23.4091C28.3334 26.3499 26.4417 28.3332 23.6167 28.3332H16.3917C13.5667 28.3332 11.6667 26.3499 11.6667 23.4091V16.5999C11.6667 13.6499 13.5667 11.6666 16.3917 11.6666ZM19.5251 22.4916L23.4834 18.5332C23.7667 18.2499 23.7667 17.7916 23.4834 17.4999C23.2001 17.2166 22.7334 17.2166 22.4501 17.4999L19.0084 20.9416L17.5501 19.4832C17.2667 19.1999 16.8001 19.1999 16.5167 19.4832C16.2334 19.7666 16.2334 20.2249 16.5167 20.5166L18.5001 22.4916C18.6417 22.6332 18.8251 22.6999 19.0084 22.6999C19.2001 22.6999 19.3834 22.6332 19.5251 22.4916Z"
        fill="url(#paint0_linear_180_237)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_180_237"
          x1="28.3334"
          y1="28.3332"
          x2="8.50158"
          y2="22.5832"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color} />
          <Stop offset="1" stopColor={color} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
