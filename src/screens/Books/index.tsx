import React, {useMemo, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import TabSelector from '@/components/Tabs';
import BottomNavigation from '@/components/BottomNavigation';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import EmptyScreen from './EmptyScreen';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useUserStore} from '@/stores/userStore';
import {Book} from '@/types/common';
import ActionText from '@/components/ActionText';
import {useDelete} from '@/components/hooks/useDelete';

export default function Books() {
  const nav = useNavigation<UseNavigationProp>();
  const [currentTab, setCurrentTab] = useState(0);
  const books = useUserStore(state => state.books);
  const removeBook = useUserStore(state => state.removeBook);
  console.log('books', books);

  const {showConfirmation} = useDelete({onConfirm: removeBook});

  const [inProgress, completed] = useMemo(() => {
    return books.reduce(
      (acc, book) => {
        if (!book?.isCompleted) {
          acc[0].push(book);
        } else {
          acc[1].push(book);
        }
        return acc;
      },
      [[] as Book[], [] as Book[]],
    );
  }, [books]);

  const accessor = currentTab === 0 ? inProgress : completed;

  const isEmpty = books.length === 0;

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
          <CustomText fs={18}>Books</CustomText>

          {!isEmpty && (
            <View
              style={{
                position: 'absolute',
                top: 2,
                right: 0,
              }}>
              <ActionText
                title="Add"
                onPress={() => nav.navigate(Screens.ADD_BOOK)}
              />
            </View>
          )}
        </View>

        <TabSelector
          currentTab={currentTab}
          onChangeTab={setCurrentTab}
          tabs={['In process', 'Completed']}
        />

        {isEmpty && (
          <EmptyScreen onPress={() => nav.navigate(Screens.ADD_BOOK)} />
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
              }}>
              {accessor.map(book => (
                <TouchableOpacity
                  key={book.id}
                  onLongPress={() => showConfirmation(book.id)}
                  onPress={() => nav.navigate(Screens.BOOK_DETAILS, {book})}>
                  <View
                    style={{
                      width: 166,
                      height: 215,
                      borderRadius: 10,
                      backgroundColor: '#2F2F31',
                    }}>
                    {book.cover && (
                      <Image
                        source={{uri: book.cover}}
                        style={{width: 166, height: 215, borderRadius: 10}}
                      />
                    )}
                  </View>
                  <CustomText mt={5}>{book.title}</CustomText>
                  {/* <CustomText mt={2} color="#ABABAB" fs={14}>
                  {book.authorName} {book.authorSurname}
                </CustomText> */}
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
