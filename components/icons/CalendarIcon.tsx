import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CalendarIconProps {
  size?: number;
  color?: string;
}

export const CalendarIcon: React.FC<CalendarIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M1.6665 10C1.6665 6.85734 1.6665 5.286 2.64281 4.30968C3.61913 3.33337 5.19047 3.33337 8.33317 3.33337H11.6665C14.8092 3.33337 16.3806 3.33337 17.3568 4.30968C18.3332 5.286 18.3332 6.85734 18.3332 10V11.6667C18.3332 14.8094 18.3332 16.3808 17.3568 17.357C16.3806 18.3334 14.8092 18.3334 11.6665 18.3334H8.33317C5.19047 18.3334 3.61913 18.3334 2.64281 17.357C1.6665 16.3808 1.6665 14.8094 1.6665 11.6667V10Z" stroke={color} strokeWidth="1.5"/>
      <Path d="M5.8335 3.33337V2.08337" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M14.1665 3.33337V2.08337" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M2.0835 7.5H17.9168" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>
  );
}; 