import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface RoundedCheckIconProps {
  size?: number;
  color?: string;
}

export const RoundedCheckIcon: React.FC<RoundedCheckIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M1.6665 10C1.6665 6.07165 1.6665 4.10746 2.8869 2.88708C4.10728 1.66669 6.07146 1.66669 9.99984 1.66669C13.9282 1.66669 15.8924 1.66669 17.1128 2.88708C18.3332 4.10746 18.3332 6.07165 18.3332 10C18.3332 13.9284 18.3332 15.8926 17.1128 17.1129C15.8924 18.3334 13.9282 18.3334 9.99984 18.3334C6.07146 18.3334 4.10728 18.3334 2.8869 17.1129C1.6665 15.8926 1.6665 13.9284 1.6665 10Z"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M7.0835 10.4167L8.75016 12.0834L12.9168 7.91669"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
