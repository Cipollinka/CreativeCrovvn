import {View} from 'react-native';
import React from 'react';

export default function Container({
  children,
  center,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        alignItems: center ? 'center' : 'flex-start',
        justifyContent: center ? 'center' : 'flex-start',
        position: 'relative',
      }}>
      {children}
    </View>
  );
}
