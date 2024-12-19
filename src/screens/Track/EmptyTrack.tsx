import {View, Image} from 'react-native';
import React from 'react';
import CustomText from '@/components/ui/Text';
import Button from '@/components/ui/Button';

export default function EmptyTrack({onPress}: {onPress: () => void}) {
  return (
    <View
      style={{
        backgroundColor: '#2F2F31',
        padding: 20,
        borderRadius: 16,
        gap: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 40,
      }}>
      <Image
        source={require('@/assets/images/empty_track.png')}
        style={{width: 103, height: 175}}
      />
      <CustomText fs={22} style={{fontWeight: 'bold'}}>
        Add your first track
      </CustomText>
      <CustomText
        color="#ABABAB"
        align="center"
        style={{maxWidth: 200, lineHeight: 22}}>
        Click on the button below to add a track
      </CustomText>
      <Button
        isFullWidth
        title="Add track"
        style={{marginTop: 15}}
        onPress={onPress}
      />
    </View>
  );
}
