import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface LocationIconProps {
  size?: number;
  color?: string;
}

export const LocationIcon: React.FC<LocationIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M3.3335 8.45277C3.3335 4.70492 6.31826 1.66669 10.0002 1.66669C13.6821 1.66669 16.6668 4.70492 16.6668 8.45277C16.6668 12.1713 14.5391 16.5104 11.2192 18.062C10.4454 18.4238 9.55491 18.4238 8.78108 18.062C5.46126 16.5104 3.3335 12.1713 3.3335 8.45277Z" stroke={color} strokeWidth="1.5"/>
      <Path d="M10 10.8333C11.3807 10.8333 12.5 9.71402 12.5 8.33331C12.5 6.9526 11.3807 5.83331 10 5.83331C8.61929 5.83331 7.5 6.9526 7.5 8.33331C7.5 9.71402 8.61929 10.8333 10 10.8333Z" stroke={color} strokeWidth="1.5"/>
    </Svg>
  );
}; 