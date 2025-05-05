import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface ShareIconProps {
  size?: number;
  color?: string;
}

export const ShareIcon: React.FC<ShareIconProps> = ({ size = 20, color = '#212121' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.49998 9.99996C7.49998 11.1505 6.56724 12.0833 5.41665 12.0833C4.26605 12.0833 3.33331 11.1505 3.33331 9.99996C3.33331 8.84938 4.26605 7.91663 5.41665 7.91663C6.56724 7.91663 7.49998 8.84938 7.49998 9.99996Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M11.6667 5.41663L7.5 8.33329"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M11.6667 14.5833L7.5 11.6666"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M15.8334 15.4167C15.8334 16.5673 14.9006 17.5 13.75 17.5C12.5994 17.5 11.6667 16.5673 11.6667 15.4167C11.6667 14.2661 12.5994 13.3334 13.75 13.3334C14.9006 13.3334 15.8334 14.2661 15.8334 15.4167Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M15.8334 4.58333C15.8334 5.73392 14.9006 6.66667 13.75 6.66667C12.5994 6.66667 11.6667 5.73392 11.6667 4.58333C11.6667 3.43274 12.5994 2.5 13.75 2.5C14.9006 2.5 15.8334 3.43274 15.8334 4.58333Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </Svg>
  );
}; 