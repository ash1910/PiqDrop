import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface SocialShareIconProps {
  size?: number;
  color?: string;
  bgColor?: string;
}

export const SocialShareIcon: React.FC<SocialShareIconProps> = ({ 
  size = 44, 
  color = 'white',
  bgColor = 'rgba(255, 255, 255, 0.15)'
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <Path
        d="M0 22C0 12.6177 0 7.92655 2.47976 4.69486C3.11817 3.86288 3.86288 3.11817 4.69486 2.47976C7.92655 0 12.6177 0 22 0C31.3823 0 36.0735 0 39.3051 2.47976C40.1371 3.11817 40.8818 3.86288 41.5202 4.69486C44 7.92655 44 12.6177 44 22C44 31.3823 44 36.0735 41.5202 39.3051C40.8818 40.1371 40.1371 40.8818 39.3051 41.5202C36.0735 44 31.3823 44 22 44C12.6177 44 7.92655 44 4.69486 41.5202C3.86288 40.8818 3.11817 40.1371 2.47976 39.3051C0 36.0735 0 31.3823 0 22Z"
        fill={bgColor}
      />
      <Path
        d="M20.6085 25.8274H15.3579"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.9507 17.7503H28.2013"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.2721 17.7052C19.2721 16.6255 18.3903 15.75 17.3028 15.75C16.2153 15.75 15.3335 16.6255 15.3335 17.7052C15.3335 18.7849 16.2153 19.6604 17.3028 19.6604C18.3903 19.6604 19.2721 18.7849 19.2721 17.7052Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.6666 25.7948C28.6666 24.7151 27.7855 23.8396 26.698 23.8396C25.6098 23.8396 24.728 24.7151 24.728 25.7948C24.728 26.8745 25.6098 27.75 26.698 27.75C27.7855 27.75 28.6666 26.8745 28.6666 25.7948Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}; 