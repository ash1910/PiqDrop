import React from 'react';
import { Svg, Path, Rect } from 'react-native-svg';

interface LeftArrowIconProps {
  size?: number;
  color?: string;
}

export const LeftArrowIcon: React.FC<LeftArrowIconProps> = ({ size = 44, color = 'white' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <Rect width={size} height={size} rx="12" fill={color} fillOpacity="0.15"/>
      <Path 
        d="M24.5 17C24.5 17 19.5 20.6824 19.5 22C19.5 23.3177 24.5 27 24.5 27" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}; 