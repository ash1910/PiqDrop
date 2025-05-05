import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface HomeIconProps {
  size?: number;
  color?: string;
}

export const HomeIcon: React.FC<HomeIconProps> = ({ size = 24, color = '#55B086' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
      <Path d="M15.375 16.1666C14.7088 16.6853 13.8335 17 12.875 17C11.9164 17 11.0413 16.6853 10.375 16.1666" stroke={color} stroke-width="1.5" stroke-linecap="round"/>
      <Path d="M4.83482 13.0112C4.54063 11.0968 4.39354 10.1397 4.75547 9.29111C5.11738 8.44256 5.92035 7.86198 7.52628 6.70084L8.72615 5.83329C10.7239 4.38885 11.7228 3.66663 12.8753 3.66663C14.0278 3.66663 15.0268 4.38885 17.0245 5.83329L18.2243 6.70084C19.8303 7.86198 20.6333 8.44256 20.9952 9.29111C21.3571 10.1397 21.21 11.0968 20.9158 13.0112L20.665 14.6436C20.2479 17.3574 20.0394 18.7143 19.0662 19.5238C18.0929 20.3333 16.67 20.3333 13.8243 20.3333H11.9263C9.08061 20.3333 7.65775 20.3333 6.68449 19.5238C5.71123 18.7143 5.50272 17.3574 5.08568 14.6436L4.83482 13.0112Z" stroke={color} stroke-width="1.5" stroke-linejoin="round"/>
    </Svg>
  );
}; 