import React, {useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import {Book} from '@/types/common';
import BackButton from '@/components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {UseNavigationProp} from '@/types/navigation';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import BottomNavigation from '@/components/BottomNavigation';
import Row from '@/components/layout/Row';
import ArrowIcon from '@/assets/icons/arrow.svg';

export default function BookRead({route}: any) {
  const nav = useNavigation<UseNavigationProp>();
  const book = route?.params?.book as Book | undefined;
  const pages = book?.pages;
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentPage = pages?.[currentPageIndex];

  const isPrevDisabled = currentPageIndex === 0;
  const isNextDisabled =
    !pages?.length || currentPageIndex === pages?.length - 1;

  const onPressPrevPage = () => {
    if (isPrevDisabled) return;
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const onPressNextPage = () => {
    if (isNextDisabled) return;

    setCurrentPageIndex(currentPageIndex + 1);
  };

  return (
    <BackgroundWrapper>
      <Container>
        <BackButton onPress={() => nav.goBack()} />

        <ScrollView style={{marginTop: 20, flex: 1}}>
          <CustomText fs={28} style={{fontWeight: 'bold'}}>
            {currentPage?.title}
          </CustomText>
          <CustomText mt={20}>{currentPage?.text}</CustomText>
        </ScrollView>

        <Row style={{width: '100%', justifyContent: 'space-between'}}>
          <TouchableOpacity disabled={isPrevDisabled} onPress={onPressPrevPage}>
            <View
              style={{
                width: 31,
                height: 31,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 9999,
                backgroundColor: '#fff',
                opacity: isPrevDisabled ? 0.5 : 1,
              }}>
              <ArrowIcon width={17} height={18} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity disabled={isNextDisabled} onPress={onPressNextPage}>
            <View
              style={{
                width: 31,
                height: 31,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 9999,
                backgroundColor: '#fff',
                opacity: isNextDisabled ? 0.5 : 1,
              }}>
              <ArrowIcon
                width={17}
                height={18}
                style={{transform: [{rotate: '180deg'}]}}
              />
            </View>
          </TouchableOpacity>
        </Row>
      </Container>

      <BottomNavigation />
    </BackgroundWrapper>
  );
}
