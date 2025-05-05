import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface AccountIconProps {
  size?: number;
  color?: string;
}

export const AccountIcon: React.FC<AccountIconProps> = ({ size = 24, color = '#55B086' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
      <Path d="M7.10631 14.9013C5.92734 15.6033 2.83614 17.0367 4.71889 18.8305C5.63859 19.7066 6.66291 20.3333 7.95073 20.3333H15.2993C16.5871 20.3333 17.6114 19.7066 18.5311 18.8305C20.4138 17.0367 17.3227 15.6033 16.1437 14.9013C13.379 13.2551 9.87099 13.2551 7.10631 14.9013Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <Path d="M15.375 7.41663C15.375 9.48769 13.6961 11.1666 11.625 11.1666C9.55393 11.1666 7.875 9.48769 7.875 7.41663C7.875 5.34556 9.55393 3.66663 11.625 3.66663C13.6961 3.66663 15.375 5.34556 15.375 7.41663Z" stroke={color} stroke-width="1.5"/>
    </Svg>
  );
}; 