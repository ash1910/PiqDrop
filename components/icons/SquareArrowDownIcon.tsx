import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SquareArrowDownIconProps {
  size?: number;
  color?: string;
}

export const SquareArrowDownIcon: React.FC<SquareArrowDownIconProps> = ({ size = 20, color = 'white' }) => {
  return (
    <Svg width="21" height="20" viewBox="0 0 21 20" fill="none">
      <Path d="M10.25 6.66666V13.3333M10.25 13.3333L12.75 10.8333M10.25 13.3333L7.75 10.8333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <Path d="M1.9165 9.99999C1.9165 6.07161 1.9165 4.10743 3.1369 2.88705C4.35728 1.66666 6.32146 1.66666 10.2498 1.66666C14.1782 1.66666 16.1424 1.66666 17.3628 2.88705C18.5832 4.10743 18.5832 6.07161 18.5832 9.99999C18.5832 13.9283 18.5832 15.8926 17.3628 17.1129C16.1424 18.3333 14.1782 18.3333 10.2498 18.3333C6.32146 18.3333 4.35728 18.3333 3.1369 17.1129C1.9165 15.8926 1.9165 13.9283 1.9165 9.99999Z" stroke="white" stroke-width="1.5"/>
    </Svg>
  );
}; 