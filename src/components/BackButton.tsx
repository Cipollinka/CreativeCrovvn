import React from 'react';
import BackIcon from '@/assets/icons/back.svg';
import {TouchableOpacity} from 'react-native';

interface Props {
  onPress: () => void;
}

export default function BackButton({onPress}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <BackIcon width={12} height={16} color={'#FFD214'} />
    </TouchableOpacity>
  );
}
