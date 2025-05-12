import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface SentBtnIconProps {
  size?: number;
  color?: string;
  bgColor?: string;
}

export const SentBtnIcon: React.FC<SentBtnIconProps> = ({ 
  size = 44, 
  color = 'white',
  bgColor = '#55B086'
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <Rect width={size} height={size} rx={size/2} fill={bgColor}/>
      <Path d="M15.748 29.3625L29.5061 23.2271C30.6092 22.7352 30.6092 21.2648 29.5061 20.7729L15.748 14.6375C14.5014 14.0816 13.2085 15.316 13.8259 16.4724L16.4526 21.3922C16.6569 21.7748 16.6569 22.2252 16.4526 22.6078L13.8259 27.5276C13.2085 28.6841 14.5014 29.9184 15.748 29.3625Z" stroke={color} strokeWidth="1.5"/>
    </Svg>
  );
};
