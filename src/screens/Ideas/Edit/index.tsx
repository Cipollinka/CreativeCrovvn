import React, {useLayoutEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import Row from '@/components/layout/Row';
import BackButton from '@/components/BackButton';
import ActionText from '@/components/ActionText';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import AlbumIcon from '@/assets/icons/album.svg';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import {Idea} from '@/types/common';
import {useUserStore} from '@/stores/userStore';

export default function IdeasEdit({route}: any) {
  const nav = useNavigation<UseNavigationProp>();

  const idea = route?.params?.idea as Idea;

  const [imagePath, setImagePath] = useState<string | null>(null);
  const [boardName, setBoardName] = useState('');
  const editIdea = useUserStore(state => state.editIdea);

  const isDoneDisabled = !boardName;

  useLayoutEffect(() => {
    try{
    idea.cover && setImagePath(idea.cover);
    setBoardName(idea.name);
    } catch(_) {
      
    }
  }, [idea]);

  const handleDonePress = () => {
    if (isDoneDisabled) return;
    if (idea) {
      editIdea(idea.id, {
        name: boardName,
        cover: imagePath || undefined,
      });
      nav.navigate(Screens.IDEAS_DETAILS, {id: idea.id});

      return;
    }
    nav.navigate(Screens.IDEAS_CONTENT, {cover: imagePath, boardName});
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

  return (
    <BackgroundWrapper>
      <Container>
        <Row style={{justifyContent: 'space-between', width: '100%'}}>
          <BackButton onPress={() => nav.goBack()} />
          <CustomText>Add board</CustomText>
          <ActionText
            disabled={isDoneDisabled}
            title="Done"
            onPress={handleDonePress}
          />
        </Row>

        <View style={{marginTop: 20, gap: 10, marginBottom: 20}}>
          <CustomText>Add cover</CustomText>
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

        <View style={styles.inputBlock}>
          <Label title="The name of the board" style={{marginLeft: 5}} />
          <Input
            value={boardName}
            onChangeText={setBoardName}
            placeholder="Enter the name of the board"
          />
        </View>
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
});
