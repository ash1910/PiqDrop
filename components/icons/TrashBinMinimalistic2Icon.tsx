import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface TrashBinMinimalistic2IconProps {
  size?: number;
  color?: string;
}

export const TrashBinMinimalistic2Icon: React.FC<TrashBinMinimalistic2IconProps> = ({ size = 20, color = '#FF4949' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M17.0834 5H2.91669"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M15.6943 7.08337L15.311 12.8326C15.1635 15.045 15.0898 16.1513 14.3689 16.8256C13.6481 17.5 12.5394 17.5 10.3221 17.5H9.67767C7.46029 17.5 6.35163 17.5 5.63079 16.8256C4.90995 16.1513 4.8362 15.045 4.6887 12.8326L4.30542 7.08337"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M7.6424 3.33329C7.98559 2.3623 8.91164 1.66663 10.0001 1.66663C11.0886 1.66663 12.0147 2.3623 12.3579 3.33329"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}; 