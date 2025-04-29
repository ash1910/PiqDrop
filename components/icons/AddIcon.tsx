import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface AddIconProps {
  size?: number;
  color?: string;
}

export const AddIcon: React.FC<AddIconProps> = ({ size = 15, color = "#212121" }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 15 16" fill="none">
      <Path
        d="M7.5 3V13"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.5 8H12.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}; 