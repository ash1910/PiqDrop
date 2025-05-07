import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface ProfileIconProps {
  size?: number;
  color?: string;
}

export const ProfileIcon: React.FC<ProfileIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M8.32937 1.68444C6.24731 1.59629 4.63876 1.83614 4.63876 1.83614C3.62305 1.90877 1.67654 2.4782 1.67656 5.80378C1.67658 9.10108 1.65503 13.1661 1.67656 14.7866C1.67656 15.7767 2.28958 18.0861 4.41138 18.2098C6.99041 18.3603 11.6359 18.3923 13.7674 18.2098C14.3379 18.1777 16.2375 17.7297 16.4779 15.663C16.727 13.5219 16.6774 12.0339 16.6774 11.6797"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.81738 10.8463H9.15069"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M5.81738 14.1797H12.484"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M12.5411 9.71531C10.6043 9.71531 9.03418 8.14518 9.03418 6.20836C9.03418 4.27153 10.6043 2.70142 12.5411 2.70142C14.1114 2.70142 15.4258 3.73347 15.8727 5.15628H14.996"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.541 4.80554V6.20832L13.2424 6.90971"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.0329 6.55901C16.0433 6.44359 16.0486 6.3266 16.0486 6.20831M13.5938 9.71526C13.7135 9.67584 13.8306 9.62983 13.9444 9.57772M15.6245 7.96179C15.6921 7.83147 15.7524 7.69641 15.8049 7.55715M14.7133 9.09425C14.8341 8.99427 14.9485 8.88615 15.0557 8.77066"
        stroke={color}
        strokeWidth={0.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
