import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface RoundedEditIconProps {
  size?: number;
  color?: string;
}

export const RoundedEditIcon: React.FC<RoundedEditIconProps> = ({
  size = 20,
  color = '#212121',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M11.7279 3.2379C12.3489 2.56509 12.6594 2.22869 12.9893 2.03246C13.7854 1.55899 14.7658 1.54426 15.5752 1.99362C15.9106 2.17985 16.2306 2.50679 16.8707 3.16065C17.5108 3.81452 17.8308 4.14145 18.0131 4.48413C18.453 5.31095 18.4386 6.31235 17.9751 7.1256C17.783 7.46265 17.4537 7.77984 16.7951 8.41419L8.95867 15.9619C7.71057 17.1641 7.0865 17.7652 6.30655 18.0698C5.5266 18.3744 4.66917 18.352 2.95431 18.3072L2.72099 18.3011C2.19893 18.2874 1.9379 18.2806 1.78616 18.1084C1.63442 17.9362 1.65514 17.6703 1.69657 17.1385L1.71907 16.8498C1.83568 15.3529 1.89398 14.6046 2.18626 13.9319C2.47854 13.2591 2.9827 12.7129 3.99103 11.6204L11.7279 3.2379Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <Path d="M10.833 3.33331L16.6663 9.16665" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <Path d="M11.6665 18.3333H18.3332" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};