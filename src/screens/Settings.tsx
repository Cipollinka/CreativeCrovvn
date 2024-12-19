import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import Row from '@/components/layout/Row';
import BackButton from '@/components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {Linking, TouchableOpacity, View} from 'react-native';
import BackIcon from '@/assets/icons/back.svg';

interface ItemProps {
  title: string;
  onPress: () => void;
}

function Item({title, onPress}: ItemProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Row
        style={{
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#2F2F31',
          height: 60,
          paddingHorizontal: 15,
          borderRadius: 10,
        }}>
        <CustomText>{title}</CustomText>
        <BackIcon
          width={12}
          height={16}
          color={'#ABABAB'}
          style={{transform: [{rotate: '180deg'}]}}
        />
      </Row>
    </TouchableOpacity>
  );
}

export default function Settings() {
  const nav = useNavigation<UseNavigationProp>();
  return (
    <BackgroundWrapper>
      <Container>
        <Row
          style={{
            marginTop: 10,
            width: '100%',
            position: 'relative',
          }}>
          <BackButton onPress={() => nav.goBack()} />
          <CustomText fs={18} style={{marginLeft: '38%'}}>
            Settings
          </CustomText>
        </Row>

        <View style={{width: '100%', marginTop: 40, gap: 10}}>
          <Item
            title="Edit Profile"
            onPress={() => nav.navigate(Screens.PROFILE_EDIT)}
          />
          <Item
            title="Privacy Policy"
            onPress={() => Linking.openURL('https://www.termsfeed.com/live/76d6b121-cf04-4359-9612-336e1668ce90')}
          />
          <Item
            title="Terms of Use"
            onPress={() => Linking.openURL('https://www.termsfeed.com/live/76d6b121-cf04-4359-9612-336e1668ce90')}
          />
        </View>
      </Container>
    </BackgroundWrapper>
  );
}
