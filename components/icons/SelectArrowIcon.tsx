import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SelectArrowIconProps {
  size?: number;
  color?: string;
}

export const SelectArrowIcon: React.FC<SelectArrowIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M4.16663 7.5L9.99996 12.5L15.8333 7.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}; 