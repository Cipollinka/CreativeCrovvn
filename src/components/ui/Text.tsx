import React from 'react';
import {Text, StyleSheet, TextStyle, StyleProp, TextProps} from 'react-native';

const fontWeights = {
  regular: 'SF Pro Display Regular',
  bold: 'SF Pro Display Bold',
  semibold: 'SF Pro Display Semibold',
  black: 'SF Pro Display Black',
  light: 'SF Pro Display Light',
  medium: 'SF Pro Display Medium',
  thin: 'SF Pro Display Thin',
  ultralight: 'SF Pro Display Ultralight',
  heavy: 'SF Pro Display Heavy',
};

interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
  fw?: keyof typeof fontWeights;
  fs?: number;
  align?: 'left' | 'center' | 'right' | 'justify';
  mt?: number;
  color?: string;
  children: React.ReactNode;
}

const CustomText = ({
  style,
  fw = 'regular',
  fs = 17,
  align = 'left',
  mt,
  color,
  ...props
}: Props) => {
  return (
    <Text
      style={[
        styles.text,
        style,
        {
          fontFamily: fontWeights[fw],
          fontSize: fs || 17,
          textAlign: align,
          marginTop: mt || 0,
          color: color || styles.text.color,
        },
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
});

export default CustomText;
