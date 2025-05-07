import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface MoreVerticalIconProps {
  size?: number;
  color?: string;
}

export const MoreVerticalIcon: React.FC<MoreVerticalIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M9.99365 10H10.0012"
        stroke={color}
        strokeWidth={2.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.98682 15H9.99432"
        stroke={color}
        strokeWidth={2.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 5H10.0075"
        stroke={color}
        strokeWidth={2.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
