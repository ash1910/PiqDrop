import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export const EditIcon: React.FC<IconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Rect width="20" height="20" rx="10" fill="#0D1114" />
      <Path
        d="M10.7855 6.92631C11.0678 6.62049 11.2089 6.46758 11.3589 6.37839C11.7208 6.16317 12.1664 6.15648 12.5343 6.36073C12.6867 6.44539 12.8322 6.59399 13.1231 6.8912C13.4141 7.18842 13.5596 7.33702 13.6424 7.49278C13.8424 7.86861 13.8358 8.32379 13.6252 8.69345C13.5378 8.84666 13.3881 8.99083 13.0888 9.27917L9.52678 12.71C8.95946 13.2564 8.6758 13.5296 8.32127 13.6681C7.96675 13.8066 7.57701 13.7964 6.79752 13.776L6.69147 13.7732C6.45417 13.767 6.33552 13.7639 6.26655 13.6856C6.19758 13.6074 6.20699 13.4865 6.22583 13.2448L6.23605 13.1135C6.28906 12.4332 6.31556 12.093 6.44841 11.7872C6.58126 11.4814 6.81043 11.2332 7.26876 10.7366L10.7855 6.92631Z"
        stroke="white"
        strokeWidth={0.681818}
        strokeLinejoin="round"
      />
      <Path
        d="M10.3788 6.9697L13.0303 9.62121"
        stroke="white"
        strokeWidth={0.681818}
        strokeLinejoin="round"
      />
      <Path
        d="M10.7576 13.7879H13.7879"
        stroke="white"
        strokeWidth={0.681818}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}; 
