import React, {useLayoutEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import {useUserStore} from '@/stores/userStore';
import Row from '@/components/layout/Row';
import BackButton from '@/components/BackButton';
import ActionText from '@/components/ActionText';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {ScrollView, View} from 'react-native';
import Input from '@/components/ui/Input';
import {Page} from '@/types/common';
import Button from '@/components/ui/Button';
import BackIcon from '@/assets/icons/back.svg';
import DeleteIcon from '@/assets/icons/delete.svg';

const calculateHeight = (lineBreaks: number) => {
  const lines = lineBreaks || 1;
  const lineHeight = 20;
  const padding = 20;
  return lines * lineHeight + padding;
};

export default function BookContent({route}: {route: any}) {
  const nav = useNavigation<UseNavigationProp>();
  const bookId = route?.params?.bookId as number;
  const bookPages = route?.params?.pages as Page[] | undefined;
  console.log('BookContent bookId', bookId);

  const [pages, setPages] = useState<Page[]>([{title: '', text: ''}]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [height, setHeight] = useState(40);
  const [prevLines, setPrevLines] = useState(1);

  const currentPage = pages[currentPageIndex];

  const editBook = useUserStore(state => state.editBook);
  const isDoneDisabled = pages.some(page => !page.title || !page.text);
  const isLastPage = currentPageIndex === pages.length - 1;
  const isPrevDisabled = currentPageIndex === 0;
  const isNextDisabled = isDoneDisabled && isLastPage;

  useLayoutEffect(() => {
    if (!bookPages) return;

    setPages(bookPages);
  }, [bookPages]);

  const handleDonePress = () => {
    editBook(bookId, {pages});

    nav.navigate(Screens.BOOK);
  };

  const handleNextPagePress = () => {
    if (isNextDisabled) return;

    if (isLastPage) {
      setPages(prev => [...prev, {title: '', text: ''}]);
    }
    setTimeout(() => {
      setCurrentPageIndex(prev => prev + 1);
    }, 0);
  };

  const handlePrevPagePress = () => {
    if (isPrevDisabled) return;
    setCurrentPageIndex(prev => prev - 1);
  };

  const handleChange = (text: string, entity: 'title' | 'text') => {
    const copy = [...pages];
    copy[currentPageIndex][entity] = text;
    setPages(copy);

    if (entity === 'text') {
      const lineBreaks = text.split('\n').length;

      if (prevLines === lineBreaks) return;
      setPrevLines(lineBreaks);

      setHeight(calculateHeight(lineBreaks));
    }
  };

  const handleDeletePage = () => {
    const filtered = pages.filter((_, index) => index !== currentPageIndex);
    if (currentPageIndex !== 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
    setPages(filtered);
  };

  return (
    <BackgroundWrapper>
      <Container>
        <Row style={{justifyContent: 'space-between', width: '100%'}}>
          <BackButton onPress={() => nav.goBack()} />
          <CustomText style={{marginLeft: 15}}>Creating book</CustomText>
          <ActionText
            disabled={isDoneDisabled}
            onPress={handleDonePress}
            title="Done"
          />
        </Row>

        <ScrollView
          style={{width: '100%', flex: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={{paddingTop: 20}}>
            <Input
              value={currentPage?.title}
              style={{
                width: '100%',
                fontSize: 28,
                fontWeight: 'bold',
                backgroundColor: 'transparent',
              }}
              onChangeText={text => handleChange(text, 'title')}
              placeholder="Enter the page title"
            />
          </View>
          <View style={{paddingTop: 20}}>
            <Input
              value={currentPage?.text}
              style={{
                width: '100%',
                height,
                fontSize: 16,
                backgroundColor: 'transparent',
              }}
              onChangeText={text => handleChange(text, 'text')}
              multiline
              placeholder="Enter the text of the book here..."
            />
          </View>
        </ScrollView>

        <Row
          style={{
            marginTop: 20,
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Button
            icon={<BackIcon width={8} height={13} color={'#000'} />}
            disabled={isPrevDisabled}
            onPress={handlePrevPagePress}
          />
          <Button
            icon={<DeleteIcon width={20} height={20} color="#000" />}
            disabled={pages.length === 1}
            onPress={handleDeletePage}
          />

          <Button
            disabled={isNextDisabled}
            icon={
              <BackIcon
                width={8}
                height={13}
                color={'#000'}
                style={{transform: [{rotate: '180deg'}]}}
              />
            }
            onPress={handleNextPagePress}
          />
        </Row>
      </Container>
    </BackgroundWrapper>
  );
}
