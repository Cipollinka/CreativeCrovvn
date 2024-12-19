import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {Idea, IdeaContent} from '@/types/common';
import Row from '@/components/layout/Row';
import ActionText from '@/components/ActionText';
import BackButton from '@/components/BackButton';
import {Image, ScrollView, View} from 'react-native';

export default function ObserveContent({route}: any) {
  const nav = useNavigation<UseNavigationProp>();

  const idea = route?.params?.idea as Idea;
  const content = route?.params?.content as IdeaContent;

  const isCoversExist =
    content?.covers?.length !== undefined && content?.covers?.length > 0;

  return (
    <BackgroundWrapper>
      <Container>
        <Row style={{justifyContent: 'space-between', width: '100%'}}>
          <BackButton onPress={() => nav.goBack()} />
          <CustomText>Idea</CustomText>
          <ActionText
            title="Edit"
            onPress={() =>
              nav.navigate(Screens.IDEAS_CONTENT, {
                cover: idea?.cover || null,
                boardName: idea.name,
                ideaId: idea.id,
                contentId: content.id,
              })
            }
          />
        </Row>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%', marginTop: 20}}>
          {isCoversExist && (
            <Row
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 10,
              }}>
              {content?.covers?.map((item, index) => (
                <View
                  key={item}
                  style={{
                    width: index ? '48%' : '100%',
                    height: index ? 153 : 200,
                    backgroundColor: '#2F2F31',
                    borderRadius: 10,
                  }}>
                  <Image
                    source={{uri: item}}
                    style={{
                      width: '100%',
                      height: index ? 153 : 200,

                      borderRadius: 10,
                    }}
                  />
                </View>
              ))}
            </Row>
          )}

          <CustomText fs={28} mt={20} style={{fontWeight: 'bold'}}>
            {content?.name}
          </CustomText>

          <CustomText mt={10} color="#ABABAB">
            {content?.text}
          </CustomText>
        </ScrollView>
      </Container>
    </BackgroundWrapper>
  );
}
