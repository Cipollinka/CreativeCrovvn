import React, {useLayoutEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import BottomNavigation from '@/components/BottomNavigation';
import Row from '@/components/layout/Row';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionText from '@/components/ActionText';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import BackButton from '@/components/BackButton';
import {useUserStore} from '@/stores/userStore';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Links from './Links';
import Button from '@/components/ui/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import ProfileIcon from '@/assets/icons/profile.svg';

export default function ProfileEdit() {
  const nav = useNavigation<UseNavigationProp>();
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState<string[]>(['']);
  const [imagePath, setImagePath] = useState<null | string>(null);

  const isUserExist = user.name;
  const isDoneDisabled = !name;
  const isLinksFilled = links.every(link => link);

  useLayoutEffect(() => {
    setName(user.name);
    setSurname(user.surname);
    setDescription(user.description);
    setLinks(user.links);
    setImagePath(user.avatar);
  }, [user]);

  const handleLinksChange = (data: any, index: number) => {
    links[index] = data;
    setLinks([...links]);
  };

  const handleAddLinkPress = () => {
    setLinks(prev => [...prev, '']);
  };

  const handleDeleteLink = (index: number) => {
    setLinks(prev => {
      const newData = [...prev];
      newData.splice(index, 1);
      return newData;
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

  const handleDonePress = () => {
    if (isDoneDisabled) return;

    setUser({
      name,
      surname,
      description,
      links,
      avatar: imagePath || '',
    });

    nav.navigate(Screens.PROFILE);
  };

  return (
    <BackgroundWrapper>
      <Container>
        <Row
          style={{
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
          }}>
          {!isUserExist && (
            <View
              style={{
                position: 'absolute',
                top: 2,
                left: 0,
              }}>
              <BackButton onPress={() => nav.goBack()} />
            </View>
          )}
          <CustomText fs={18}>Edit profile</CustomText>

          <View
            style={{
              position: 'absolute',
              top: 2,
              right: 0,
            }}>
            <ActionText
              title="Done"
              disabled={isDoneDisabled}
              onPress={handleDonePress}
            />
          </View>
        </Row>

        <ScrollView
          style={{width: '100%', marginTop: 20}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: 20,
              gap: 10,
              width: '100%',
              alignItems: 'center',
            }}>
            {!imagePath && (
              <TouchableOpacity
                style={{width: 120, height: 120}}
                onPress={handleImageSelection}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 120,
                    height: 120,
                    backgroundColor: '#2F2F31',
                    borderRadius: 9999,
                  }}>
                  <ProfileIcon width={61} height={61} />
                </View>
              </TouchableOpacity>
            )}
            {imagePath && (
              <TouchableOpacity
                style={{width: 120, height: 120}}
                onLongPress={() => setImagePath(null)}>
                <Image
                  source={{uri: imagePath}}
                  style={{width: 120, height: 120, borderRadius: 9999}}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={{width: '100%', gap: 10, marginTop: 20}}>
            <View style={styles.inputBlock}>
              <Label title="Name" style={{marginLeft: 5}} />
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Enter a name here"
              />
            </View>

            <View style={styles.inputBlock}>
              <Label title="Surname" style={{marginLeft: 5}} />
              <Input
                value={surname}
                onChangeText={setSurname}
                placeholder="Enter your last name here"
              />
            </View>

            <View style={styles.inputBlock}>
              <Label title="Description" style={{marginLeft: 5}} />
              <Input
                value={description}
                onChangeText={setDescription}
                placeholder="Enter a description here"
              />
            </View>
          </View>

          <View style={{width: '100%', marginTop: 20, gap: 10}}>
            <CustomText>Links to social networks</CustomText>
            {links.map((link, index) => (
              <Links
                key={index}
                data={link}
                onChange={handleLinksChange}
                index={index}
                onDelete={handleDeleteLink}
              />
            ))}
          </View>

          <View style={{width: '100%', marginTop: 10}}>
            <Button
              title="Add link"
              disabled={!isLinksFilled}
              onPress={handleAddLinkPress}
            />
          </View>
        </ScrollView>
      </Container>

      <BottomNavigation />
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
