import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface CalendarIconProps {
  size?: number;
  color?: string;
}

export const CalendarIcon: React.FC<CalendarIconProps> = ({ size = 20, color = '#55B086' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M13.3337 1.66669V5.00002M6.66699 1.66669V5.00002"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.8333 3.33331H9.16667C6.02397 3.33331 4.45262 3.33331 3.47631 4.30962C2.5 5.28594 2.5 6.85728 2.5 9.99998V11.6666C2.5 14.8093 2.5 16.3807 3.47631 17.357C4.45262 18.3333 6.02397 18.3333 9.16667 18.3333H10.8333C13.976 18.3333 15.5474 18.3333 16.5237 17.357C17.5 16.3807 17.5 14.8093 17.5 11.6666V9.99998C17.5 6.85728 17.5 5.28594 16.5237 4.30962C15.5474 3.33331 13.976 3.33331 10.8333 3.33331Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.5 8.33331H17.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.16699 11.6667H13.3337M6.66699 11.6667H6.67448M10.8337 15H6.66699M13.3337 15H13.3262"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
