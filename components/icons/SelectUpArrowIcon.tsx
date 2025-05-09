import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SelectUpArrowIconProps {
  size?: number;
  color?: string;
} 

export const SelectUpArrowIcon: React.FC<SelectUpArrowIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M15 12.5C15 12.5 11.3175 7.50001 9.99996 7.5C8.68238 7.49999 5 12.5 5 12.5" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
}
