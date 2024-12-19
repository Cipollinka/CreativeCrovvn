import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import {IdeaContent as TIdeaContent} from '@/types/common';
import {useUserStore} from '@/stores/userStore';
import BottomNavigation from '@/components/BottomNavigation';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import BackButton from '@/components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import Row from '@/components/layout/Row';
import ActionText from '@/components/ActionText';
import BackIcon from '@/assets/icons/back.svg';
import PlusIcon from '@/assets/icons/plus.svg';

interface IdeaContentProps {
  currentContent: TIdeaContent;
  onPress: () => void;
}

function IdeaContent({currentContent, onPress}: IdeaContentProps) {
  return (
    <TouchableOpacity style={{width: '100%'}} onPress={onPress}>
      <Row
        style={{
          width: '100%',
          backgroundColor: '#2F2F31',
          justifyContent: 'space-between',
          borderRadius: 10,
          padding: 16,
        }}>
        <View>
          <CustomText fs={17}>{currentContent.name}</CustomText>
          <CustomText
            color="#ABABAB"
            numberOfLines={1}
            style={{maxWidth: '100%'}}>
            {currentContent.text}
          </CustomText>
        </View>

        <BackIcon
          width={8}
          height={13}
          style={{transform: [{rotate: '180deg'}]}}
          color={'#ABABAB'}
        />
      </Row>
    </TouchableOpacity>
  );
}

export default function IdeasDetails({route}: any) {
  const nav = useNavigation<UseNavigationProp>();
  const id = route?.params?.id as number;
  const currentIdea = useUserStore(state =>
    state.ideas.find(idea => idea.id === id),
  );
  console.log('currentIdea', currentIdea);

  return (
    <BackgroundWrapper>
      <Container>
        <Row style={{justifyContent: 'space-between', width: '100%'}}>
          <BackButton onPress={() => nav.navigate(Screens.IDEAS)} />
          <CustomText>{currentIdea?.name}</CustomText>
          <ActionText
            title="Edit"
            onPress={() =>
              nav.navigate(
                Screens.IDEAS_EDIT,
                currentIdea ? {idea: currentIdea} : undefined,
              )
            }
          />
        </Row>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%', marginTop: 20}}>
          <View
            style={{
              backgroundColor: '#2F2F31',
              borderRadius: 10,
              width: '100%',
              height: 211,
            }}>
            {currentIdea?.cover && (
              <Image
                source={{uri: currentIdea.cover}}
                style={{width: '100%', height: 211, borderRadius: 10}}
              />
            )}
          </View>

          <View style={{width: '100%', marginTop: 20, gap: 10}}>
            {currentIdea?.content.map(content => (
              <IdeaContent
                key={content.id}
                currentContent={content}
                onPress={() =>
                  nav.navigate(Screens.IDEAS_OBSERVE, {
                    idea: currentIdea,
                    content,
                  })
                }
              />
            ))}
          </View>

          <TouchableOpacity
            style={{
              marginHorizontal: 'auto',
              marginTop: 20,
            }}
            onPress={() =>
              nav.navigate(Screens.IDEAS_CONTENT, {ideaId: currentIdea?.id})
            }>
            <View
              style={{
                backgroundColor: '#fff',
                width: 82,
                height: 82,
                borderRadius: 9999,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 'auto',
                marginTop: 'auto',
              }}>
              <PlusIcon width={22} height={22} stroke={'#2F2F31'} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Container>

      <BottomNavigation />
    </BackgroundWrapper>
  );
}
