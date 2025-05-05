import React from 'react';
import { Svg, Path, Rect } from 'react-native-svg';

interface WalletIconProps {
  size?: number;
  color?: string;
}

export const WalletIcon: React.FC<WalletIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M5 8.33331H8.33333" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <Path d="M17.3611 9.16669H15.1923C13.7054 9.16669 12.5 10.2859 12.5 11.6667C12.5 13.0474 13.7054 14.1667 15.1923 14.1667H17.3611C17.4306 14.1667 17.4653 14.1667 17.4946 14.1649C17.944 14.1375 18.3019 13.8052 18.3314 13.3879C18.3333 13.3606 18.3333 13.3284 18.3333 13.2639V10.0694C18.3333 10.005 18.3333 9.97277 18.3314 9.94552C18.3019 9.52819 17.944 9.19585 17.4946 9.16844C17.4653 9.16669 17.4306 9.16669 17.3611 9.16669Z" stroke={color} stroke-width="1.5"/>
      <Path d="M17.4709 9.16667C17.4061 7.60642 17.1972 6.64979 16.5237 5.97631C15.5474 5 13.976 5 10.8334 5H8.33335C5.19065 5 3.61931 5 2.643 5.97631C1.66669 6.95262 1.66669 8.524 1.66669 11.6667C1.66669 14.8093 1.66669 16.3807 2.643 17.357C3.61931 18.3333 5.19065 18.3333 8.33335 18.3333H10.8334C13.976 18.3333 15.5474 18.3333 16.5237 17.357C17.1972 16.6836 17.4061 15.7269 17.4709 14.1667" stroke={color} stroke-width="1.5"/>
      <Path d="M5 5L8.11291 2.93594C8.9895 2.35469 10.1772 2.35469 11.0538 2.93594L14.1667 5" stroke={color} stroke-width="1.5" stroke-linecap="round"/>
      <Path d="M14.9927 11.6667H15.0002" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
}; 