import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MessageIconProps {
  size?: number;
  color?: string;
}

export const MessageIcon: React.FC<MessageIconProps> = ({ size = 25, color = '#616161' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
      <Path d="M4.2915 7L10.0524 10.2641C12.1762 11.4675 13.0735 11.4675 15.1973 10.2641L20.9582 7" stroke={color} stroke-width="1.25" stroke-linejoin="round"/>
      <Path d="M4.30465 13.2296C4.35912 15.7843 4.38636 17.0615 5.32897 18.0078C6.27157 18.954 7.58345 18.9869 10.2072 19.0528C11.8243 19.0935 13.4254 19.0935 15.0425 19.0528C17.6663 18.9869 18.9781 18.954 19.9208 18.0078C20.8633 17.0615 20.8906 15.7843 20.945 13.2296C20.9626 12.4082 20.9626 11.5917 20.945 10.7703C20.8906 8.21568 20.8633 6.93837 19.9208 5.99218C18.9781 5.04599 17.6663 5.01303 15.0425 4.9471C13.4254 4.90647 11.8243 4.90647 10.2072 4.94709C7.58345 5.01301 6.27157 5.04597 5.32896 5.99217C4.38635 6.93836 4.35912 8.21567 4.30464 10.7703C4.28712 11.5917 4.28713 12.4082 4.30465 13.2296Z" stroke={color} stroke-width="1.25" stroke-linejoin="round"/>
    </Svg>
  );
}; 