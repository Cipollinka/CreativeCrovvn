import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import EmptyTrack from './EmptyTrack';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useUserStore} from '@/stores/userStore';
import ActionText from '@/components/ActionText';
import Row from '@/components/layout/Row';
import BottomNavigation from '@/components/BottomNavigation';
import {useDelete} from '@/components/hooks/useDelete';

export default function Track() {
  const nav = useNavigation<UseNavigationProp>();
  const tracks = useUserStore(state => state.tracks);
  const removeTrack = useUserStore(state => state.removeTrack);

  const isTracksExists = tracks.length > 0;

  const handleRemove = (trackId: number) => {
    removeTrack(trackId);
  };

  const {showConfirmation} = useDelete({onConfirm: handleRemove});

  return (
    <BackgroundWrapper>
      <Container>
        <Row
          style={{
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
          }}>
          <CustomText fs={18}>Track</CustomText>

          {isTracksExists && (
            <View
              style={{
                position: 'absolute',
                top: 2,
                right: 0,
              }}>
              <ActionText
                title="Add"
                onPress={() => nav.navigate(Screens.ADD_TRACK)}
              />
            </View>
          )}
        </Row>

        {!isTracksExists && (
          <EmptyTrack onPress={() => nav.navigate(Screens.ADD_TRACK)} />
        )}

        {isTracksExists && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}>
            <View
              style={{
                width: '100%',
                marginTop: 20,
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 10,
                marginHorizontal: 'auto',
                alignItems: 'center',
              }}>
              {tracks.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onLongPress={() => showConfirmation(item.id)}
                  onPress={() =>
                    nav.navigate(Screens.TRACK_DETAILS, {track: item})
                  }>
                  <View
                    style={{
                      width: 166,
                      height: 215,
                      borderRadius: 10,
                      backgroundColor: '#2F2F31',
                    }}>
                    {item.cover && (
                      <Image
                        source={{uri: item.cover}}
                        style={{width: 166, height: 215, borderRadius: 10}}
                      />
                    )}
                  </View>
                  <CustomText mt={5}>{item.title}</CustomText>
                  <CustomText mt={2} color="#ABABAB" fs={14}>
                    {item.artist}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </Container>

      <BottomNavigation />
    </BackgroundWrapper>
  );
}
