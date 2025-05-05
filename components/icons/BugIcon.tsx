import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface BugIconProps {
  size?: number;
  color?: string;
}

export const BugIcon: React.FC<BugIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M4.16669 8.33333C4.16669 5.11168 6.77836 2.5 10 2.5C13.2217 2.5 15.8334 5.11168 15.8334 8.33333V12.5C15.8334 15.7217 13.2217 18.3333 10 18.3333C6.77836 18.3333 4.16669 15.7217 4.16669 12.5V8.33333Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M15.8333 10.8333H18.3333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M4.16669 10.8333H1.66669"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M17.0832 5.83331L15.5851 6.43255"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M2.91675 5.83331L4.41486 6.43255"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M12.0833 2.91669L14.1666 1.66669"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M7.91665 2.91669L5.83331 1.66669"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M17.0834 15.8335L15.4167 15.1668"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M2.91669 15.8335L4.58335 15.1668"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M8.75 8.75H11.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M8.75 12.9167H11.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}; 