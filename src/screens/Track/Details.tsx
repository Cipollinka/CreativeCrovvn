import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import Row from '@/components/layout/Row';
import BackButton from '@/components/BackButton';
import ActionText from '@/components/ActionText';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {Track} from '@/types/common';
import {Image, ScrollView, View} from 'react-native';
import TrackItem from './Track';
import TextView from './TextView';

export default function TrackDetails({route}: any) {
  const nav = useNavigation<UseNavigationProp>();
  const track = route.params.track as Track;
  console.log('track', track);

  return (
    <BackgroundWrapper>
      <Container>
        <Row style={{justifyContent: 'space-between', width: '100%'}}>
          <BackButton onPress={() => nav.goBack()} />
          <CustomText style={{marginLeft: 15}}>{track.title}</CustomText>
          <ActionText
            onPress={() => nav.navigate(Screens.ADD_TRACK, {track})}
            title="Edit"
          />
        </Row>

        <ScrollView
          style={{marginTop: 20, width: '100%'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: 20,
              backgroundColor: '#2F2F31',
              borderRadius: 10,
              width: '100%',
              height: 268,
            }}>
            <Image
              source={{uri: track.cover}}
              style={{width: '100%', height: 268}}
            />
          </View>

          <View style={{marginTop: 10}}>
            <CustomText fw="semibold" fs={20}>
              {track.title}
            </CustomText>
            <CustomText color="#ABABAB" fs={14}>
              {track.artist}
            </CustomText>
          </View>

          <TrackItem audioPath={track.audioPath} track={track} />

          <View style={{marginTop: 20, width: '100%', marginBottom: 20}}>
            {track.textData.map((item, index) => (
              <TextView key={index} data={item} />
            ))}
          </View>
        </ScrollView>
      </Container>
    </BackgroundWrapper>
  );
}
