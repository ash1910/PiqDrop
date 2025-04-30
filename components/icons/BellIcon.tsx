import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface BellIconProps {
  size?: number;
  color?: string;
}

export const BellIcon: React.FC<BellIconProps> = ({ size = 44, color = 'white' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <Rect width={size} height={size} rx="12" fill={color} fillOpacity="0.15"/>
      <Path
        d="M27.6243 20.0913V19.5041C27.6243 16.2802 25.1062 13.6667 22 13.6667C18.8938 13.6667 16.3757 16.2802 16.3757 19.5041V20.0913C16.3757 20.796 16.1748 21.4848 15.7982 22.0712L14.8753 23.5079C14.0324 24.8203 14.6759 26.6041 16.142 27.0191C19.9773 28.1048 24.0227 28.1048 27.858 27.0191C29.3242 26.6041 29.9677 24.8203 29.1247 23.5079L28.2018 22.0712C27.8252 21.4848 27.6243 20.796 27.6243 20.0913Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M18.25 27.8333C18.7959 29.2898 20.2687 30.3333 22 30.3333C23.7312 30.3333 25.2042 29.2898 25.75 27.8333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}; 