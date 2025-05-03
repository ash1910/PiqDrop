import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface WeightIconProps {
  size?: number;
  color?: string;
}

export const WeightIcon: React.FC<WeightIconProps> = ({ size = 16, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M2.5 8.33335C2.5 5.19065 2.5 3.61931 3.47631 2.643C4.45262 1.66669 6.02397 1.66669 9.16667 1.66669H10.8333C13.976 1.66669 15.5474 1.66669 16.5237 2.643C17.5 3.61931 17.5 5.19065 17.5 8.33335V11.6667C17.5 14.8094 17.5 16.3808 16.5237 17.357C15.5474 18.3334 13.976 18.3334 10.8333 18.3334H9.16667C6.02397 18.3334 4.45262 18.3334 3.47631 17.357C2.5 16.3808 2.5 14.8094 2.5 11.6667V8.33335Z" stroke={color} strokeWidth="1.5"/>
      <Path d="M6.6665 15H13.3332" stroke={color} stroke-width="1.5" stroke-linecap="round"/>
      <Path d="M13.6763 8.30898L14.2311 6.92226C14.6263 5.93437 14.0071 4.8342 12.9576 4.65928L12.6031 4.60019C10.8797 4.31296 9.1205 4.31296 7.39711 4.60019L7.04258 4.65928C5.99307 4.8342 5.37396 5.93437 5.76911 6.92226L6.3238 8.30898C6.52028 8.80017 7.04939 9.07067 7.56261 8.94242C9.163 8.54233 10.8372 8.54233 12.4376 8.94242C12.9508 9.07067 13.4799 8.80017 13.6763 8.30898Z" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M8.48292 8.27378L7.92041 6.7049" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>
  );
}; 