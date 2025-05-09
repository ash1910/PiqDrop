import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface SearchIconProps {
  size?: number;
  color?: string;
}

export const SearchIcon: React.FC<SearchIconProps> = ({ size = 20, color = '#BDBDBD' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx="9.80541" cy="9.8055" r="7.49047" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M15.0151 15.4043L17.9518 18.3333" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};
