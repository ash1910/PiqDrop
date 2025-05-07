import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface VerticalDashedLineIconProps {
  size?: number;
  color?: string;
}

export const VerticalDashedLineIcon: React.FC<VerticalDashedLineIconProps> = ({ size = 77, color = '#919191' }) => {
  return (
    <Svg width={2} height={size} viewBox="0 0 2 77" fill="none">
      <Path
        d="M1 1V76"
        stroke={color}
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
    </Svg>
  );
};
