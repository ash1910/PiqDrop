import React from 'react';
import { Svg, Circle } from 'react-native-svg';

interface DotIconProps {
  size?: number;
  color?: string;
}

export const DotIcon: React.FC<DotIconProps> = ({ size = 3, color = '#D9D9D9' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 3 3" fill="none">
      <Circle cx="1.5" cy="1.5" r="1.5" fill={color} />
    </Svg>
  );
};
