import React, {useLayoutEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import Row from '@/components/layout/Row';
import BackButton from '@/components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import ActionText from '@/components/ActionText';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import AlbumIcon from '@/assets/icons/album.svg';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import {Book, CoAuthor, Genre, genreData} from '@/types/common';
import CoAuthors from './CoAuthors';
import Button from '@/components/ui/Button';
import {MultiSelect} from 'react-native-element-dropdown';
import BackIcon from '@/assets/icons/back.svg';
import CheckmarkIcon from '@/assets/icons/checkmark.svg';
import {useUserStore} from '@/stores/userStore';

export default function AddBook({route}: any) {
  const book = route?.params?.book as Book | undefined;
  const nav = useNavigation<UseNavigationProp>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [imagePath, setImagePath] = useState<null | string>(null);
  const [coAuthors, setCoAuthors] = useState<CoAuthor[]>([
    {
      name: '',
      surname: '',
    },
  ]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [authorSurname, setAuthorSurname] = useState('');

  const addBook = useUserStore(state => state.addBook);
  const editBook = useUserStore(state => state.editBook);

  const isDoneDisabled =
    !authorName || !authorSurname || !genres.length || !title || !description;

  const isCoAuthorsFilled = coAuthors.every(
    author => author.name && author.surname,
  );

  useLayoutEffect(() => {
    if (!book) return;

    setTitle(book.title);
    setDescription(book.description);
    setAuthorName(book.authorName);
    setAuthorSurname(book.authorSurname);
    book.cover && setImagePath(book.cover);
    setGenres(book.genres);
    book.coAuthors && setCoAuthors(book.coAuthors);
  }, [book]);

  const handleDonePress = () => {
    if (book) {
      editBook(book.id, {
        title,
        description,
        authorName,
        authorSurname,
        cover: imagePath || '',
        genres,
        coAuthors,
        pages: book?.pages,
        isCompleted: false,
      });
      nav.navigate(Screens.BOOK_CONTENT, {
        bookId: book.id,
        pages: book?.pages || undefined,
      });
      return;
    }

    const bookId = addBook({
      title,
      description,
      authorName,
      authorSurname,
      cover: imagePath || '',
      genres,
      coAuthors,
      pages: [],
      isCompleted: false,
    });

    nav.navigate(Screens.BOOK_CONTENT, {
      bookId,
    });
  };

  const handleImageSelection = async () => {
    try {
      // Open the image library
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const sourceUri = result.assets[0].uri; // URI of the selected image
        const fileName = result.assets[0].fileName || `image_${Date.now()}.jpg`; // Generate file name
        const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`; // Local path

        if (!sourceUri) return;

        // Save the file locally
        await RNFS.copyFile(sourceUri, destPath);
        console.log(`Image saved locally at: ${destPath}`);

        // Update state with the local path to display the image
        setImagePath(destPath);
      }
    } catch (error) {
      console.error('Error selecting or saving image:', error);
    }
  };

  const handleCoAuthorsChange = (data: any, index: number) => {
    coAuthors[index] = data;
    setCoAuthors([...coAuthors]);
  };

  const handleAddCoAuthorPress = () => {
    setCoAuthors(prev => [...prev, {name: '', surname: ''}]);
  };

  const handleDeleteCoAuthor = (index: number) => {
    setCoAuthors(prev => {
      const newData = [...prev];
      newData.splice(index, 1);
      return newData;
    });
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
          showsVerticalScrollIndicator={false}
          style={{marginTop: 20, width: '100%'}}>
          <View style={{marginTop: 20, gap: 10}}>
            <CustomText>Upload Cover</CustomText>
            {!imagePath && (
              <TouchableOpacity
                style={{width: 123, height: 123}}
                onPress={handleImageSelection}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 123,
                    height: 123,
                    backgroundColor: '#2F2F31',
                    borderRadius: 10,
                  }}>
                  <AlbumIcon width={61} height={61} />
                </View>
              </TouchableOpacity>
            )}
            {imagePath && (
              <TouchableOpacity
                style={{width: 123, height: 123}}
                onLongPress={() => setImagePath(null)}>
                <Image
                  source={{uri: imagePath}}
                  style={{width: 123, height: 123, borderRadius: 10}}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={{gap: 10, width: '100%', marginTop: 10}}>
            <View style={styles.inputBlock}>
              <Label title="Book title" style={{marginLeft: 5}} />
              <Input
                value={title}
                onChangeText={setTitle}
                placeholder="Enter the name of the book here"
              />
            </View>

            <View style={styles.inputBlock}>
              <Label title="Description" style={{marginLeft: 5}} />
              <Input
                value={description}
                onChangeText={setDescription}
                placeholder="This is a book about adventures and discoveries"
                textAlignVertical="top"
              />
            </View>

            <MultiSelect
              style={[styles.dropdown]}
              data={genreData}
              search
              maxHeight={300}
              labelField="label"
              valueField="label"
              placeholder={'Genre'}
              placeholderStyle={{color: '#fff'}}
              renderRightIcon={() => (
                <Row gap={5}>
                  <CustomText fs={13} color="#ABABAB">
                    Choose
                  </CustomText>
                  <BackIcon
                    width={8}
                    height={13}
                    style={{transform: [{rotate: '180deg'}]}}
                  />
                </Row>
              )}
              renderInputSearch={() => null}
              value={genres}
              onChange={item => setGenres(item)}
              containerStyle={styles.dropdownContainer}
              selectedStyle={null}
              itemContainerStyle={null}
              itemTextStyle={null}
              renderSelectedItem={() => <View />}
              renderItem={(item, selected) => (
                <Row style={styles.selectItem}>
                  <CustomText>{item.label}</CustomText>
                  {selected && (
                    <CheckmarkIcon
                      width={20}
                      height={20}
                      style={{marginLeft: 'auto'}}
                    />
                  )}
                </Row>
              )}
            />
          </View>

          <View style={{gap: 10, width: '100%', marginTop: 10}}>
            <CustomText fw="medium">Author</CustomText>

            <View style={styles.inputBlock}>
              <Label title="Name" style={{marginLeft: 5}} />
              <Input
                value={authorName}
                onChangeText={setAuthorName}
                placeholder="Enter the author's name"
              />
            </View>

            <View style={styles.inputBlock}>
              <Label title="Surname" style={{marginLeft: 5}} />
              <Input
                value={authorSurname}
                onChangeText={setAuthorSurname}
                placeholder="Enter the author's last name"
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={{marginVertical: 10, gap: 20}}>
            <CustomText>Co-author (optional)</CustomText>
            {coAuthors.map((data, index) => {
              return (
                <CoAuthors
                  index={index}
                  key={index}
                  data={data}
                  onChange={handleCoAuthorsChange}
                  onDelete={handleDeleteCoAuthor}
                />
              );
            })}
          </View>

          <View>
            <Button
              title="Add co-author"
              disabled={!isCoAuthorsFilled}
              onPress={handleAddCoAuthorPress}
            />
          </View>
        </ScrollView>
      </Container>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  inputBlock: {
    width: '100%',
    backgroundColor: '#2F2F31',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 7,
    gap: 2,
  },
  dropdown: {
    backgroundColor: '#2F2F31',
    height: 60,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  dropdownContainer: {
    marginTop: 10,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#2F2F31',
    borderBottomWidth: 1,
    borderBottomColor: '#ABABAB',
  },
  selectItem: {
    backgroundColor: '#2F2F31',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});
