import React, {useEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import BackButton from '@/components/BackButton';
import Row from '@/components/layout/Row';
import ActionText from '@/components/ActionText';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AlbumIcon from '@/assets/icons/album.svg';
import AudioIcon from '@/assets/icons/audio.svg';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import TextItem from './TextItem';
import {TextData, Track} from '@/types/common';
import Button from '@/components/ui/Button';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import AudioPlayer from './AudioPlayer';
import {launchImageLibrary} from 'react-native-image-picker';
import TextView from './TextView';
import {useUserStore} from '@/stores/userStore';

export default function AddTrack({route}: any) {
  const track = route?.params?.track as Track | undefined;

  const nav = useNavigation<UseNavigationProp>();
  const addTrack = useUserStore(state => state.addTrack);

  const [trackTextData, setTrackTextData] = useState<TextData[]>([
    {
      initialTime: '',
      endTime: '',
      text: '',
    },
  ]);
  const [trackTitle, setTrackTitle] = useState('');
  const [trackArtist, setTrackArtist] = useState('');

  const [filePath, setFilePath] = useState<null | string>(null);
  const [imagePath, setImagePath] = useState<null | string>(null);

  const isTextDataFilled = trackTextData.every(
    item => item.initialTime && item.endTime && item.text,
  );

  const isDoneDisabled =
    !filePath || !isTextDataFilled || !trackTitle || !trackArtist;

  useEffect(() => {
    if (!track) return;

    setTrackTitle(track.title);
    setTrackArtist(track.artist);
    setTrackTextData(track.textData);
    setFilePath(track.audioPath);
    track.cover && setImagePath(track.cover);
  }, [track]);

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

  const handleAudioUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });

      const sourcePath = result[0].uri;
      const fileName = result[0].name;
      const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      const fileExists = await RNFS.exists(destPath);

      if (!fileExists) {
        await RNFS.copyFile(sourcePath, destPath);
        console.log(`File saved locally at: ${destPath}`);
      } else {
        console.log('File already exists at:', destPath);
      }

      setFilePath(destPath);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the upload');
      } else {
        console.error(err);
      }
    }
  };

  const handleTextDataChange = (data: any, index: number) => {
    trackTextData[index] = data;
    setTrackTextData([...trackTextData]);
  };

  const handleAddTextPress = () => {
    console.log('handleAddTextPress');
    setTrackTextData(prev => [
      ...prev,
      {initialTime: '', endTime: '', text: ''},
    ]);
  };

  const handleDeleteTextData = (index: number) => {
    setTrackTextData(prev => {
      const newData = [...prev];
      newData.splice(index, 1);
      return newData;
    });
  };

  const handleDonePress = () => {
    if (!filePath) return;

    addTrack({
      title: trackTitle,
      artist: trackArtist,
      audioPath: filePath,
      cover: imagePath || '',
      textData: trackTextData,
    });

    nav.navigate(Screens.TRACK);
  };

  return (
    <BackgroundWrapper>
      <Container>
        <Row style={{justifyContent: 'space-between', width: '100%'}}>
          <BackButton onPress={() => nav.goBack()} />
          <CustomText style={{marginLeft: 15}}>Create track</CustomText>
          <ActionText
            disabled={isDoneDisabled}
            onPress={handleDonePress}
            title="Done"
          />
        </Row>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: 20}}>
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
                  style={{width: 123, height: 123}}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={{gap: 10, width: '100%', marginTop: 10}}>
            <View style={styles.inputBlock}>
              <Label title="Title track" style={{marginLeft: 5}} />
              <Input
                value={trackTitle}
                onChangeText={setTrackTitle}
                placeholder="Enter the name of the track here"
              />
            </View>

            <View style={styles.inputBlock}>
              <Label title="Name Artist" style={{marginLeft: 5}} />
              <Input
                value={trackArtist}
                onChangeText={setTrackArtist}
                placeholder="Enter the artist's name here"
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={{marginTop: 20, gap: 10}}>
            <CustomText>Downloading audio</CustomText>
            {!filePath && (
              <TouchableOpacity
                style={{width: 123, height: 123}}
                onPress={handleAudioUpload}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 123,
                    height: 123,
                    backgroundColor: '#2F2F31',
                    borderRadius: 10,
                  }}>
                  <AudioIcon width={61} height={61} />
                </View>
              </TouchableOpacity>
            )}
            {filePath && (
              <AudioPlayer path={filePath} onDelete={() => setFilePath(null)} />
            )}
          </View>
          <View style={{marginTop: 20, gap: 20}}>
            {trackTextData.map((data, index) => {
              return (
                <TextItem
                  key={index}
                  onDelete={handleDeleteTextData}
                  data={data}
                  onChange={handleTextDataChange}
                  index={index}
                />
              );
            })}
          </View>

          <View style={{marginTop: 20}}>
            <Button title="Add text" onPress={handleAddTextPress} />
          </View>

          <View style={{marginVertical: 20, gap: 20}}>
            {trackTextData.map((data, index) => {
              return <TextView key={index} data={data} />;
            })}
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
});
