import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface UserRoundedIconProps {
  size?: number;
  color?: string;
}

export const UserRoundedIcon: React.FC<UserRoundedIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10.0001 8.33332C11.841 8.33332 13.3334 6.84094 13.3334 4.99999C13.3334 3.15904 11.841 1.66666 10.0001 1.66666C8.15913 1.66666 6.66675 3.15904 6.66675 4.99999C6.66675 6.84094 8.15913 8.33332 10.0001 8.33332Z"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M10.0001 17.5C13.2217 17.5 15.8334 16.0076 15.8334 14.1667C15.8334 12.3257 13.2217 10.8333 10.0001 10.8333C6.77842 10.8333 4.16675 12.3257 4.16675 14.1667C4.16675 16.0076 6.77842 17.5 10.0001 17.5Z"
        stroke={color}
        strokeWidth={1.5}
      />
    </Svg>
  );
}; 