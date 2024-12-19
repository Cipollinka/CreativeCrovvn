import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import BottomNavigation from '@/components/BottomNavigation';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import EmptyScreen from './EmptyScreen';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useUserStore} from '@/stores/userStore';
import ActionText from '@/components/ActionText';
import {useDelete} from '@/components/hooks/useDelete';

export default function Books() {
  const nav = useNavigation<UseNavigationProp>();

  const board = useUserStore(state => state.ideas);

  const removeIdea = useUserStore(state => state.removeIdea);
  const {showConfirmation} = useDelete({onConfirm: removeIdea});

  const isEmpty = board.length === 0;

  return (
    <BackgroundWrapper>
      <Container>
        <View
          style={{
            width: '100%',
            marginTop: 20,
            marginBottom: 10,
            alignItems: 'center',
            position: 'relative',
          }}>
          <CustomText fs={18}>Board ideas</CustomText>

          <View
            style={{
              position: 'absolute',
              top: 2,
              right: 0,
            }}>
            {!isEmpty && (
              <ActionText
                title="Add"
                onPress={() => nav.navigate(Screens.IDEAS_EDIT)}
              />
            )}
          </View>
        </View>

        {isEmpty && (
          <EmptyScreen onPress={() => nav.navigate(Screens.IDEAS_EDIT)} />
        )}

        {!isEmpty && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '100%', marginTop: 20}}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 10,
                marginHorizontal: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {board.map(idea => (
                <TouchableOpacity
                  key={idea.id}
                  onLongPress={() => showConfirmation(idea.id)}
                  onPress={() =>
                    nav.navigate(Screens.IDEAS_DETAILS, {id: idea.id})
                  }>
                  <View
                    style={{
                      width: 150,
                      height: 162,
                      borderRadius: 10,
                      backgroundColor: '#2F2F31',
                    }}>
                    {idea.cover && (
                      <Image
                        source={{uri: idea.cover}}
                        style={{width: 150, height: 162, borderRadius: 10}}
                      />
                    )}
                  </View>
                  <CustomText mt={5}>{idea.name}</CustomText>
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
