import React, {useLayoutEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import Row from '@/components/layout/Row';
import BackButton from '@/components/BackButton';
import ActionText from '@/components/ActionText';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import Input from '@/components/ui/Input';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import AlbumIcon from '@/assets/icons/album.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import {useUserStore} from '@/stores/userStore';

const calculateHeight = (lineBreaks: number) => {
  const lines = lineBreaks || 1;
  const lineHeight = 20;
  const padding = 20;
  return lines * lineHeight + padding;
};

export default function IdeaContent({route}: any) {
  const nav = useNavigation<UseNavigationProp>();

  const [height, setHeight] = useState(40);
  const [prevLines, setPrevLines] = useState(1);

  const [ideaName, setIdeaName] = useState('');
  const [ideaText, setIdeaText] = useState('');

  const [imagePaths, setImagePaths] = useState<string[]>(['']);

  const ideas = useUserStore(state => state.ideas);
  const addIdea = useUserStore(state => state.addIdea);
  const editIdeaContent = useUserStore(state => state.editIdeaContent);
  const addIdeaContent = useUserStore(state => state.addIdeaContent);

  const isDoneDisabled = !ideaName || !ideaText;

  useLayoutEffect(() => {
    const ideaId = route?.params?.ideaId as number;
    const contentId = route?.params?.contentId as number;
    if (contentId === undefined || ideaId === undefined) return;

    const content = ideas[ideaId].content.find(
      content => content.id === contentId,
    );
    if (!content) return;

    setIdeaName(content.name);
    setIdeaText(content.text);
    content.covers && setImagePaths(content.covers);
  }, [route, ideas]);

  const handleDonePress = () => {
    const ideaId = route?.params?.ideaId as number;
    const contentId = route?.params?.contentId as number;
    if (ideaId) {
      if (contentId) {
        editIdeaContent(ideaId, contentId, {
          name: ideaName,
          text: ideaText,
          covers: imagePaths.filter(Boolean),
        });

        return;
      } else {
        addIdeaContent(ideaId, {
          name: ideaName,
          text: ideaText,
          covers: imagePaths.filter(Boolean),
        });
      }
      nav.navigate(Screens.IDEAS_DETAILS, {id: ideaId});
    }
    const boardName = route?.params?.boardName as string;
    const boardCover = route?.params?.cover as string | null;

    if (boardName && boardCover) {
      const newId = addIdea({
        name: boardName,
        cover: boardCover,
        content: [
          {
            id: 0,
            name: ideaName,
            text: ideaText,
            covers: imagePaths.filter(Boolean),
          },
        ],
      });

      nav.navigate(Screens.IDEAS_DETAILS, {id: newId});
      return;
    }
  };

  const handleTextChange = (text: string) => {
    const lineBreaks = text.split('\n').length;
    setIdeaText(text);

    if (prevLines === lineBreaks) return;
    setPrevLines(lineBreaks);

    setHeight(calculateHeight(lineBreaks));
  };

  const handleDeleteImage = (index: number) => {
    const copy = [...imagePaths];
    copy.splice(index, 1);
    setImagePaths(copy);
  };

  const handleImageSelection = async (index: number) => {
    const copy = [...imagePaths];
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

        copy[index] = destPath;
        setImagePaths(copy);
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

        <ScrollView
          style={{width: '100%', flex: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 20, gap: 10, marginBottom: 20}}>
            <CustomText>Add cover</CustomText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {imagePaths.map((image, index) => {
                return (
                  <View key={index} style={{marginLeft: index ? 10 : 0}}>
                    {!image && (
                      <TouchableOpacity
                        style={{width: 123, height: 123}}
                        onPress={() => handleImageSelection(index)}
                        onLongPress={() =>
                          imagePaths.length > 2 && handleDeleteImage(index)
                        }>
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
                    {image && (
                      <TouchableOpacity
                        style={{width: 123, height: 123}}
                        onLongPress={() => handleDeleteImage(index)}>
                        <Image
                          source={{uri: image}}
                          style={{width: 123, height: 123, borderRadius: 10}}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
              {imagePaths[imagePaths.length - 1] && (
                <TouchableOpacity
                  onPress={() => setImagePaths(prev => [...prev, ''])}>
                  <View
                    style={{
                      width: 123,
                      height: 123,
                      marginLeft: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#ABABAB',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <PlusIcon width={33} height={33} />
                  </View>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>

          <View>
            <Input
              value={ideaName}
              style={{
                width: '100%',
                fontSize: 28,
                fontWeight: 'bold',
                backgroundColor: 'transparent',
              }}
              onChangeText={setIdeaName}
              placeholder="Name your idea..."
            />
          </View>
          <View style={{paddingTop: 20}}>
            <Input
              value={ideaText}
              style={{
                width: '100%',
                height,
                fontSize: 16,
                backgroundColor: 'transparent',
              }}
              onChangeText={handleTextChange}
              multiline
              placeholder="Enter the text..."
            />
          </View>
        </ScrollView>
      </Container>
    </BackgroundWrapper>
  );
}
