import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface StarIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const StarIcon: React.FC<StarIconProps> = ({
  width = 49,
  height = 48,
  color = '#E6E6E6',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 49 48" fill="none">
      <Path
        d="M24.4997 34.54L32.7997 39.56C34.3197 40.48 36.1797 39.12 35.7797 37.4L33.5797 27.96L40.9197 21.6C42.2597 20.44 41.5397 18.24 39.7797 18.1L30.1197 17.28L26.3397 8.35999C25.6597 6.73999 23.3397 6.73999 22.6597 8.35999L18.8797 17.26L9.21966 18.08C7.45966 18.22 6.73966 20.42 8.07966 21.58L15.4197 27.94L13.2197 37.38C12.8197 39.1 14.6797 40.46 16.1997 39.54L24.4997 34.54Z"
        fill={color}
      />
    </Svg>
  );
};
