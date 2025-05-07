import React from 'react';
import { Svg, Circle, Path } from 'react-native-svg';

interface SuccessBadgeIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const SuccessBadgeIcon: React.FC<SuccessBadgeIconProps> = ({
  width = 137,
  height = 149,
  color = '#55B086',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 137 149" fill="none">
      <Circle cx="13.5" cy="18" r="9.5" fill={color} fillOpacity={0.5} />
      <Circle cx="68.5" cy="3" r="2.5" fill={color} fillOpacity={0.5} />
      <Circle cx="130" cy="27.5" r="7" fill={color} fillOpacity={0.5} />
      <Circle cx="120.5" cy="95" r="2.5" fill={color} fillOpacity={0.5} />
      <Circle cx="111" cy="131.5" r="2" fill={color} fillOpacity={0.5} />
      <Circle cx="84" cy="133.5" r="1" fill={color} fillOpacity={0.5} />
      <Circle cx="37.5" cy="145" r="3.5" fill={color} fillOpacity={0.5} />
      <Circle cx="4.5" cy="108" r="4.5" fill={color} fillOpacity={0.5} />
      <Circle cx="5" cy="64.5" r="1" fill={color} fillOpacity={0.5} />
      <Path
        d="M119.75 77C119.75 48.6954 96.8044 25.75 68.5 25.75C40.1954 25.75 17.25 48.6954 17.25 77C17.25 105.304 40.1954 128.25 68.5 128.25C96.8044 128.25 119.75 105.304 119.75 77Z"
        fill={color}
      />
      <Path
        d="M48 80.8438C48 80.8438 56.2 85.5203 60.3 92.375C60.3 92.375 72.6 65.4688 89 56.5"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
