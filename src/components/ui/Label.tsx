import React from 'react';
import CustomText from './Text';
import {StyleProp, TextStyle} from 'react-native';

interface Props {
  title: string;
  style?: StyleProp<TextStyle>;
}

export default function Label({title, style}: Props) {
  return (
    <CustomText fs={13} color="#ABABAB" style={style}>
      {title}
    </CustomText>
  );
}
