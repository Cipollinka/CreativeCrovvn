import React, {useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import {Book as BookType} from '@/types/common';
import BackButton from '@/components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import Row from '@/components/layout/Row';
import BottomNavigation from '@/components/BottomNavigation';
import ReadIcon from '@/assets/icons/read.svg';
import EditIcon from '@/assets/icons/edit.svg';
import Button from '@/components/ui/Button';
import {useUserStore} from '@/stores/userStore';

const ActionBtn = ({
  Icon,
  onPress,
  title,
}: {
  Icon: any;
  onPress: () => void;
  title: string;
}) => {
  const isRead = title === 'READ';
  return (
    <TouchableOpacity style={{width: '50%'}} onPress={onPress}>
      <Row
        gap={5}
        style={{
          justifyContent: 'center',
          backgroundColor: '#ABABAB',
          height: 47,
          [isRead ? 'borderTopLeftRadius' : 'borderTopRightRadius']: 10,
          [isRead ? 'borderBottomLeftRadius' : 'borderBottomRightRadius']: 10,
          borderRightWidth: 1,
        }}>
        {Icon}
        <CustomText color="#000" fs={15} style={{fontWeight: 'bold'}}>
          {title}
        </CustomText>
      </Row>
    </TouchableOpacity>
  );
};

const InfoItem = ({value, label}: {value: number; label: string}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <CustomText fs={10} color="#ABABAB">
        {label}
      </CustomText>

      <CustomText mt={5} fs={19} style={{fontWeight: 'bold'}} color="#FFF">
        {value}
      </CustomText>
    </View>
  );
};

export default function BooksDetails({route}: any) {
  const nav = useNavigation<UseNavigationProp>();

  const book = route?.params?.book as BookType | undefined;
  const [isCompleted, setIsCompleted] = useState(book?.isCompleted || false);
  const pages = book?.pages || [];
  const wordsCount = pages.reduce(
    (acc, page) => acc + page.text.split(' ').length,
    0,
  );
  const updateBook = useUserStore(state => state.editBook);

  const handleRead = () => {
    if (!book) return;

    nav.navigate(Screens.BOOK_READ, {book});
  };

  const handleEdit = () => {
    if (!book) return;

    nav.navigate(Screens.ADD_BOOK, {book});
  };

  const handleMarkAsCompleted = () => {
    if (!book) return;

    updateBook(book?.id, {isCompleted: true});
    setIsCompleted(true);
  };

  return (
    <BackgroundWrapper>
      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: '#2F2F31',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            padding: 16,
            paddingBottom: 20,
          }}>
          <BackButton onPress={() => nav.goBack()} />

          <View style={{width: '100%', marginTop: 20, alignItems: 'center'}}>
            <View
              style={{
                width: 175,
                height: 215,
                backgroundColor: '#0f0f0c',
                borderRadius: 10,
                marginBottom: 20,
                marginHorizontal: 'auto',
              }}>
              {book?.cover && (
                <Image
                  source={{uri: book?.cover}}
                  style={{maxWidth: 175, height: 215, borderRadius: 10}}
                />
              )}
            </View>

            <CustomText color="#FFD214" fs={28} style={{fontWeight: 'bold'}}>
              {book?.title}
            </CustomText>

            <Row
              mt={5}
              style={{
                flexWrap: 'wrap',
                gap: 5,
                width: '100%',
                justifyContent: 'center',
              }}>
              <CustomText fs={15} color="#ABABAB">
                {book?.authorName} {book?.authorSurname}
              </CustomText>

              {book?.coAuthors?.length &&
                book.coAuthors.length > 0 &&
                book.coAuthors.map((author, index) => (
                  <CustomText key={index} fs={15} color="#ABABAB">
                    {author.name} {author.surname}
                  </CustomText>
                ))}
            </Row>
          </View>

          <Row
            mt={20}
            gap={50}
            style={{
              paddingHorizontal: 20,
              width: '100%',
              justifyContent: 'center',
            }}>
            <InfoItem value={pages.length} label="Pages" />
            <InfoItem value={wordsCount} label="Words" />
            <InfoItem value={pages.length} label="Headlines" />
          </Row>
        </View>

        <Container>
          <Row mt={5} style={{width: '100%', justifyContent: 'space-between'}}>
            <ActionBtn
              onPress={handleRead}
              title="READ"
              Icon={<ReadIcon width={20} height={20} color="#000" />}
            />
            <ActionBtn
              onPress={handleEdit}
              title="EDIT"
              Icon={<EditIcon width={20} height={20} color="#000" />}
            />
          </Row>

          <Row gap={5} mt={15}>
            {book?.genres.map(item => (
              <View
                key={item}
                style={{
                  backgroundColor: '#2F2F31',
                  borderRadius: 10,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                }}>
                <CustomText fs={14}>{item}</CustomText>
              </View>
            ))}
          </Row>

          <CustomText mt={15}>Description</CustomText>

          <CustomText mt={10} fs={14} color="#ABABAB">
            {book?.description}
          </CustomText>

          <Button
            disabled={isCompleted}
            s={{width: '100%'}}
            style={{marginTop: 20, width: '100%'}}
            title="Mark as completed"
            onPress={handleMarkAsCompleted}
          />
        </Container>
      </ScrollView>

      <BottomNavigation />
    </BackgroundWrapper>
  );
}
