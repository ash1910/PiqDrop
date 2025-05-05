import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface PlaceIconProps {
  size?: number;
  color?: string;
}

export const PlaceIcon: React.FC<PlaceIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M17.5 13.4091V9.24794C17.5 5.67411 17.5 3.88719 16.4017 2.77694C15.3033 1.66669 13.5355 1.66669 10 1.66669C6.46447 1.66669 4.6967 1.66669 3.59835 2.77694C2.5 3.88719 2.5 5.67411 2.5 9.24794V13.4091C2.5 15.9896 2.5 17.2799 3.11176 17.8436C3.40351 18.1125 3.77179 18.2814 4.1641 18.3263C4.98668 18.4204 5.94727 17.5708 7.86847 15.8715C8.71767 15.1204 9.14233 14.7449 9.63358 14.6459C9.8755 14.5972 10.1245 14.5972 10.3664 14.6459C10.8577 14.7449 11.2823 15.1204 12.1315 15.8715C14.0527 17.5708 15.0133 18.4204 15.8359 18.3263C16.2282 18.2814 16.5965 18.1125 16.8882 17.8436C17.5 17.2799 17.5 15.9896 17.5 13.4091Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M12.5 5H7.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}; 