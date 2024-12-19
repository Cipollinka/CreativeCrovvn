import {View} from 'react-native';
import React from 'react';
import {TextData} from '@/types/common';
import CustomText from '@/components/ui/Text';

interface Props {
  data: TextData;
}

export default function TextView({data}: Props) {
  if (!data.text || !data.initialTime || !data.endTime) return null;

  return (
    <View>
      <CustomText fw="semibold" fs={14}>
        {data.initialTime} - {data.endTime}
      </CustomText>

      <CustomText mt={15} color="#ABABAB">
        {data.text}
      </CustomText>
    </View>
  );
}
