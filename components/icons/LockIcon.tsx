import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface LockIconProps {
  size?: number;
  color?: string;
}

export const LockIcon: React.FC<LockIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M1.66675 13.3333C1.66675 10.9763 1.66675 9.79781 2.39898 9.06556C3.13121 8.33331 4.30972 8.33331 6.66675 8.33331H13.3334C15.6904 8.33331 16.8689 8.33331 17.6012 9.06556C18.3334 9.79781 18.3334 10.9763 18.3334 13.3333C18.3334 15.6903 18.3334 16.8688 17.6012 17.6011C16.8689 18.3333 15.6904 18.3333 13.3334 18.3333H6.66675C4.30972 18.3333 3.13121 18.3333 2.39898 17.6011C1.66675 16.8688 1.66675 15.6903 1.66675 13.3333Z"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M5 8.33335V6.66669C5 3.90526 7.23857 1.66669 10 1.66669C12.7614 1.66669 15 3.90526 15 6.66669V8.33335"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}; 