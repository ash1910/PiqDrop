import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface CallingIconProps {
  size?: number;
  color?: string;
  bgColor?: string;
}

export const CallingIcon: React.FC<CallingIconProps> = ({ 
  size = 61, 
  color = 'white',
  bgColor = '#55B086'
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 61 61" fill="none">
      <Rect x="0.5" y="0.5" width={size - 1} height={size - 1} rx={(size - 1)/2} fill={bgColor}/>
      <Path d="M32.5 20.5C32.5 20.5 34.7 20.7 37.5 23.5C40.3 26.3 40.5 28.5 40.5 28.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M32.707 24.0356C32.707 24.0356 33.697 24.3185 35.1819 25.8034C36.6668 27.2883 36.9497 28.2783 36.9497 28.2783" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M28.5376 23.8162L29.1866 24.9791C29.7723 26.0286 29.5372 27.4053 28.6147 28.3278C28.6147 28.3278 27.4959 29.4468 29.5245 31.4755C31.5525 33.5035 32.6722 32.3853 32.6722 32.3853C33.5947 31.4628 34.9714 31.2277 36.0209 31.8134L37.1838 32.4624C38.7686 33.3468 38.9557 35.5692 37.5628 36.9622C36.7258 37.7992 35.7004 38.4505 34.5669 38.4934C32.6588 38.5658 29.4183 38.0829 26.1677 34.8323C22.9171 31.5817 22.4342 28.3412 22.5066 26.4331C22.5495 25.2996 23.2008 24.2742 24.0378 23.4372C25.4308 22.0443 27.6532 22.2314 28.5376 23.8162Z" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>
  );
};
