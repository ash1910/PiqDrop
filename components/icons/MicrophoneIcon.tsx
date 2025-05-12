import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MicrophoneIconProps {
  size?: number;
  color?: string;
}

export const MicrophoneIcon: React.FC<MicrophoneIconProps> = ({ size = 20, color = '#919191' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M5.83325 6.66667C5.83325 4.36548 7.69874 2.5 9.99992 2.5C12.3011 2.5 14.1666 4.36548 14.1666 6.66667V9.16667C14.1666 11.4678 12.3011 13.3333 9.99992 13.3333C7.69874 13.3333 5.83325 11.4678 5.83325 9.16667V6.66667Z" stroke={color} strokeWidth="1.5"/>
      <Path d="M9.16675 6.66669H10.8334" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M8.33325 9.16669H11.6666" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M16.6666 8.33331V9.16665C16.6666 12.8486 13.6818 15.8333 9.99992 15.8333C6.31802 15.8333 3.33325 12.8486 3.33325 9.16665V8.33331" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M10 15.8333V18.3333" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>
  );
};
