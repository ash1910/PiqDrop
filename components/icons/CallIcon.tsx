import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface CallIconProps {
  size?: number;
  color?: string;
}

export const CallIcon: React.FC<CallIconProps> = ({ size = 44, color = 'white' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <Rect width={size} height={size} rx="12" fill={color} fillOpacity="0.15"/>
      <Path 
        d="M20.0376 15.3162L20.6866 16.4791C21.2723 17.5286 21.0372 18.9053 20.1147 19.8278C20.1147 19.8278 18.9959 20.9468 21.0245 22.9755C23.0525 25.0035 24.1722 23.8853 24.1722 23.8853C25.0947 22.9628 26.4714 22.7277 27.5209 23.3134L28.6838 23.9624C30.2686 24.8468 30.4557 27.0692 29.0628 28.4622C28.2258 29.2992 27.2004 29.9505 26.0669 29.9934C24.1588 30.0658 20.9183 29.5829 17.6677 26.3323C14.4171 23.0817 13.9342 19.8412 14.0066 17.9331C14.0495 16.7996 14.7008 15.7742 15.5378 14.9372C16.9308 13.5443 19.1532 13.7314 20.0376 15.3162Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
    </Svg>
  );
};
