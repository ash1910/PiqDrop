import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SquareArrowUpIconProps {
  size?: number;
  color?: string;
}

export const SquareArrowUpIcon: React.FC<SquareArrowUpIconProps> = ({ size = 20, color = 'white' }) => {
  return (
    <Svg width="21" height="20" viewBox="0 0 21 20" fill="none">
      <Path d="M10.75 13.3333V6.66666M10.75 6.66666L13.25 9.16666M10.75 6.66666L8.25 9.16666" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <Path d="M2.4165 9.99999C2.4165 6.07161 2.4165 4.10743 3.6369 2.88705C4.85728 1.66666 6.82146 1.66666 10.7498 1.66666C14.6782 1.66666 16.6424 1.66666 17.8628 2.88705C19.0832 4.10743 19.0832 6.07161 19.0832 9.99999C19.0832 13.9283 19.0832 15.8926 17.8628 17.1129C16.6424 18.3333 14.6782 18.3333 10.7498 18.3333C6.82146 18.3333 4.85728 18.3333 3.6369 17.1129C2.4165 15.8926 2.4165 13.9283 2.4165 9.99999Z" stroke="white" stroke-width="1.5"/>
    </Svg>
  );
}; 