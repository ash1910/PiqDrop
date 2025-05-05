import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface PlusIconProps {
  size?: number;
  color?: string;
}

export const PlusIcon: React.FC<PlusIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M9.99998 3.33331V16.6666M16.6666 9.99998H3.33331"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}; 