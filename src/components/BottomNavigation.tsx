import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import TrackIcon from '@/assets/icons/music.svg';
import BookIcon from '@/assets/icons/book.svg';
import IdeaIcon from '@/assets/icons/idea.svg';
import ProfileIcon from '@/assets/icons/profile.svg';

import {Screens, UseNavigationProp} from '@/types/navigation';
import CustomText from './ui/Text';

interface Props {
  onPress: () => void;
  title: string;
  Icon: any;
  selected?: boolean;
}

function NavigationItem({onPress, title, Icon, selected}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.navigationItem}>
        <View style={styles.item}>
          {<Icon color={selected ? '#FFD214' : '#ABABAB'} />}
        </View>
        <CustomText
          fs={10}
          fw="medium"
          color={selected ? '#FFD214' : '#ABABAB'}>
          {title}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
}

export default function BottomNavigation() {
  const nav = useNavigation<UseNavigationProp>();
  const route = useRoute();
  const handleNavigate = (screen: Screens) => {
    nav.replace(screen);
  };

  return (
    <View
      style={{
        marginTop: 'auto',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 40,
        paddingBottom: 10,
        paddingTop: 0,
        backgroundColor: '#2F2F31',
        borderTopWidth: 1,
        borderTopColor: '#ABABAB',
      }}>
      <NavigationItem
        title="Tracks"
        Icon={TrackIcon}
        onPress={() => handleNavigate(Screens.TRACK)}
        selected={route.name === Screens.TRACK}
      />
      <NavigationItem
        title="Books"
        Icon={BookIcon}
        onPress={() => handleNavigate(Screens.BOOK)}
        selected={route.name === Screens.BOOK}
      />
      <NavigationItem
        title="Ideas"
        Icon={IdeaIcon}
        onPress={() => handleNavigate(Screens.IDEAS)}
        selected={route.name === Screens.IDEAS}
      />
      <NavigationItem
        title="Profile"
        Icon={ProfileIcon}
        onPress={() => handleNavigate(Screens.PROFILE)}
        selected={route.name === Screens.PROFILE}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  navigationItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
