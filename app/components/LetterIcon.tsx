import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface LetterIconProps {
  size?: number;
  color?: string;
}

export const LetterIcon: React.FC<LetterIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M1.66675 10C1.66675 6.85731 1.66675 5.28597 2.64306 4.30965C3.61937 3.33334 5.19071 3.33334 8.33342 3.33334H11.6667C14.8094 3.33334 16.3808 3.33334 17.3571 4.30965C18.3334 5.28597 18.3334 6.85731 18.3334 10C18.3334 13.1427 18.3334 14.7141 17.3571 15.6903C16.3808 16.6667 14.8094 16.6667 11.6667 16.6667H8.33342C5.19071 16.6667 3.61937 16.6667 2.64306 15.6903C1.66675 14.7141 1.66675 13.1427 1.66675 10Z"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M5 6.66666L6.79908 8.16589C8.32961 9.44132 9.09492 10.0791 10 10.0791C10.9051 10.0791 11.6704 9.44132 13.2009 8.16589L15 6.66666"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}; 