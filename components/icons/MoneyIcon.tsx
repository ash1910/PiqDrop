import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MoneyIconProps {
  size?: number;
  color?: string;
}

export const MoneyIcon: React.FC<MoneyIconProps> = ({ size = 16, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 21 20" fill="none">
      <Path d="M10.4998 18.3334C15.1022 18.3334 18.8332 14.6024 18.8332 10C18.8332 5.39765 15.1022 1.66669 10.4998 1.66669C5.89746 1.66669 2.1665 5.39765 2.1665 10C2.1665 14.6024 5.89746 18.3334 10.4998 18.3334Z" stroke={color} strokeWidth="1.5"/>
      <Path d="M10.5 14.1667V14.5834V15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M10.5 5V5.41667V5.83333" stroke={color} stroke-width="1.5" stroke-linecap="round"/>
      <Path d="M13 7.91665C13 6.76605 11.8807 5.83331 10.5 5.83331C9.11925 5.83331 8 6.76605 8 7.91665C8 9.06723 9.11925 9.99998 10.5 9.99998C11.8807 9.99998 13 10.9327 13 12.0833C13 13.2339 11.8807 14.1666 10.5 14.1666C9.11925 14.1666 8 13.2339 8 12.0833" stroke={color} stroke-width="1.5" stroke-linecap="round"/>
    </Svg>
  );
}; 