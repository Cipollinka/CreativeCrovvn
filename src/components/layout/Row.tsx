import {StyleProp, View, ViewStyle} from 'react-native';
import React from 'react';

export default function Row({
  children,
  gap,
  mt,
  style,
}: {
  children: React.ReactNode;
  gap?: number;
  mt?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: gap ?? 0,
          alignItems: 'center',
          marginTop: mt ?? 0,
        },
        style,
      ]}>
      {children}
    </View>
  );
}
