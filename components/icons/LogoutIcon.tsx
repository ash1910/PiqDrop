import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface LogoutIconProps {
  size?: number;
  color?: string;
}

export function LogoutIcon({ size = 24, color = '#000' }: LogoutIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 13V12C16 10.8954 15.1046 10 14 10H8C6.89543 10 6 10.8954 6 12V13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 16V8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 13L12 16L9 13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
} 