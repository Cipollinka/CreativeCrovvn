import {TextInput, TextInputProps} from 'react-native';
import React from 'react';

export default function Input({style, ...props}: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor="#ABABAB"
      {...props}
      style={[
        {
          backgroundColor: '#2F2F31',
          height: 30,
          paddingHorizontal: 5,
          paddingVertical: 0,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          color: '#ABABAB',
        },
        style,
      ]}
    />
  );
}
