import React from 'react';
import { Svg, Path, Rect } from 'react-native-svg';

interface SafetyIconProps {
  size?: number;
  color?: string;
}

export const SafetyIcon: React.FC<SafetyIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none"> 
      <Path d="M2.5 8.68057C2.5 6.01588 2.5 4.68356 2.8146 4.23533C3.12919 3.78711 4.38193 3.35829 6.88742 2.50065L7.36477 2.33726C8.67083 1.89019 9.32383 1.66666 10 1.66666C10.6762 1.66666 11.3292 1.89019 12.6352 2.33726L13.1126 2.50065C15.6181 3.35829 16.8708 3.78711 17.1854 4.23533C17.5 4.68356 17.5 6.01588 17.5 8.68057C17.5 9.08299 17.5 9.51949 17.5 9.99282C17.5 14.6912 13.9675 16.9712 11.7512 17.9394C11.15 18.202 10.8494 18.3333 10 18.3333C9.15058 18.3333 8.85 18.202 8.2488 17.9394C6.03247 16.9712 2.5 14.6912 2.5 9.99282C2.5 9.51949 2.5 9.08299 2.5 8.68057Z" stroke={color} stroke-width="1.5"/>
      <Path d="M7.91669 10.3333L9.10719 11.6667L12.0834 8.33334" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}; 