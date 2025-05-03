import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SelectDownArrowIconProps {
  size?: number;
  color?: string;
}

export const SelectDownArrowIcon: React.FC<SelectDownArrowIconProps> = ({ size = 16, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path d="M12 6.00003C12 6.00003 9.05407 10 8 10C6.94587 10 4 6 4 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}; 