import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface TimeIconProps {
  size?: number;
  color?: string;
}

export const TimeIcon: React.FC<TimeIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 21 20" fill="none">
      <Path d="M10.4998 18.3333C15.1022 18.3333 18.8332 14.6023 18.8332 9.99996C18.8332 5.39759 15.1022 1.66663 10.4998 1.66663C5.89746 1.66663 2.1665 5.39759 2.1665 9.99996C2.1665 14.6023 5.89746 18.3333 10.4998 18.3333Z" stroke={color} strokeWidth="1.5"/>
      <Path d="M10.5 6.66663V9.99996L12.5833 12.0833" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}; 