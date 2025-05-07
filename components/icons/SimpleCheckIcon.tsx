import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface SimpleCheckIconProps {
  size?: number;
  color?: string;
}

export const SimpleCheckIcon: React.FC<SimpleCheckIconProps> = ({ size = 20, color = '#55B086' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M5.83301 10.75L8.45209 13.75L14.9997 6.25"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
