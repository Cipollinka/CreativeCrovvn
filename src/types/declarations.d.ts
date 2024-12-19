declare module '*.svg' {
  import React from 'react';
  import {type SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '@env' {
  export const WEATHER_API_KEY: string;
  export const OPEN_TRIP_MAP_API_KEY: string;
}
