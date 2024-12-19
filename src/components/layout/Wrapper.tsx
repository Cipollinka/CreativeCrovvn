import React from 'react';
import {SafeAreaView} from 'react-native';

export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#0f0f0c', position: 'relative'}}>
      {children}
    </SafeAreaView>
  );
}
