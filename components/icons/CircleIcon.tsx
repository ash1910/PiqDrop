import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';

interface CircleIconProps {
  size?: number;
  color?: string;
}

export const CircleIcon: React.FC<CircleIconProps> = ({ size = 24, color = '#000' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    </Svg>
  );
}; 