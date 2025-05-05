import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ManageIconProps {
  size?: number;
  color?: string;
}

export const ManageIcon: React.FC<ManageIconProps> = ({ size = 25, color = '#55B086' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
      <Path d="M14.8589 7.84619C14.8589 7.84619 15.2756 8.26286 15.6922 9.09619C15.6922 9.09619 17.0157 7.01286 18.1922 6.59619" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      <Path d="M10.7039 3.68438C8.62182 3.59623 7.01327 3.83608 7.01327 3.83608C5.99756 3.90871 4.05105 4.47814 4.05107 7.80371C4.05109 11.101 4.02954 15.166 4.05107 16.7865C4.05107 17.7766 4.66409 20.086 6.78589 20.2098C9.36492 20.3603 14.0105 20.3923 16.1419 20.2098C16.7125 20.1776 18.612 19.7297 18.8525 17.6629C19.1015 15.5218 19.052 14.0338 19.052 13.6797" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      <Path d="M20.708 7.84623C20.708 10.1474 18.8408 12.0129 16.5374 12.0129C14.2339 12.0129 12.3667 10.1474 12.3667 7.84623C12.3667 5.54505 14.2339 3.67957 16.5374 3.67957C18.8408 3.67957 20.708 5.54505 20.708 7.84623Z" stroke={color} stroke-width="1.25" stroke-linecap="round"/>
      <Path d="M8.19189 12.8463H11.5252" stroke={color} stroke-width="1.25" stroke-linecap="round"/>
      <Path d="M8.19189 16.1797H14.8585" stroke={color} stroke-width="1.25" stroke-linecap="round"/>
    </Svg>
  );
}; 