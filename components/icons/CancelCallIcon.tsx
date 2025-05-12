import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface CancelCallIconProps {
  size?: number;
  color?: string;
  bgColor?: string;
}

export const CancelCallIcon: React.FC<CancelCallIconProps> = ({ 
  size = 61, 
  color = 'white',
  bgColor = '#FF4949'
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 61 61" fill="none">
      <Rect x="0.5" y="0.5" width={size - 1} height={size - 1} rx={(size - 1)/2} fill={bgColor}/>
      <Path d="M24.1072 35.3973L25.4469 35.0173C26.6559 34.6744 27.5 33.4826 27.5 32.1185C27.5 32.1185 27.5 30.4639 30.5 30.4639C33.4999 30.4639 33.5 32.1185 33.5 32.1185C33.5 33.4826 34.3441 34.6744 35.5531 35.0173L36.8928 35.3973C38.7184 35.9151 40.5 34.4102 40.5 32.3504C40.5 31.1127 40.2234 29.873 39.4171 29.0032C38.0598 27.5389 35.3068 25.5 30.5 25.5C25.6932 25.5 22.9402 27.5389 21.5829 29.0032C20.7766 29.873 20.5 31.1127 20.5 32.3504C20.5 34.4102 22.2816 35.9151 24.1072 35.3973Z" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>
  );
};
