import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, Screens} from '@/types/navigation';

import Track from '@/screens/Track';
import AddTrack from '@/screens/Track/AddTrack';
import TrackDetails from '@/screens/Track/Details';
import Books from '@/screens/Books';
import AddBook from '@/screens/AddBook';
import Profile from '@/screens/Profile';
import ProfileEdit from '@/screens/ProfileEdit';
import Settings from '@/screens/Settings';
import Ideas from '@/screens/Ideas/Default';
import BookContent from '@/screens/AddBook/BookContent';
import BooksDetails from '@/screens/BooksDetails';
import BookRead from '@/screens/BookRead';
import IdeasEdit from '@/screens/Ideas/Edit';
import IdeaContent from '@/screens/Ideas/Edit/IdeaContent';
import IdeasDetails from '@/screens/Ideas/Details';
import ObserveContent from '@/screens/Ideas/Edit/Observe';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.BOOK_DETAILS}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Screens.TRACK} component={Track} />
        <Stack.Screen name={Screens.ADD_TRACK} component={AddTrack} />
        <Stack.Screen name={Screens.TRACK_DETAILS} component={TrackDetails} />
        <Stack.Screen name={Screens.BOOK} component={Books} />
        <Stack.Screen name={Screens.ADD_BOOK} component={AddBook} />
        <Stack.Screen name={Screens.PROFILE} component={Profile} />
        <Stack.Screen name={Screens.SETTINGS} component={Settings} />
        <Stack.Screen name={Screens.IDEAS} component={Ideas} />
        <Stack.Screen name={Screens.PROFILE_EDIT} component={ProfileEdit} />
        <Stack.Screen name={Screens.BOOK_CONTENT} component={BookContent} />
        <Stack.Screen name={Screens.BOOK_DETAILS} component={BooksDetails} />
        <Stack.Screen name={Screens.BOOK_READ} component={BookRead} />
        <Stack.Screen name={Screens.IDEAS_EDIT} component={IdeasEdit} />
        <Stack.Screen name={Screens.IDEAS_CONTENT} component={IdeaContent} />
        <Stack.Screen name={Screens.IDEAS_DETAILS} component={IdeasDetails} />
        <Stack.Screen name={Screens.IDEAS_OBSERVE} component={ObserveContent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
