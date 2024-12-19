import {TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from './ui/Text';

interface Props {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

export default function ActionText({onPress, title, disabled}: Props) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <CustomText
        color="#FFD214"
        fw="medium"
        fs={14}
        style={{opacity: disabled ? 0.5 : 1}}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
}
