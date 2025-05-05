import React from 'react';
import { Svg, Path, Rect } from 'react-native-svg';

interface RightArrowIconProps {
  size?: number;
  color?: string;
}

export const RightArrowIcon: React.FC<RightArrowIconProps> = ({ size = 18, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path d="M6.75 13.4998C6.75 13.4998 11.25 10.1857 11.25 8.99984C11.25 7.81402 6.75 4.49988 6.75 4.49988" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}; 