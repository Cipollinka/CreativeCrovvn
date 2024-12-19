import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Book, Idea, IdeaContent, Page, Track} from './common';

export enum Screens {
  TRACK = 'track',
  ADD_TRACK = 'addTrack',
  TRACK_DETAILS = 'trackDetails',

  BOOK = 'book',
  BOOK_DETAILS = 'bookDetails',
  ADD_BOOK = 'addBook',
  BOOK_CONTENT = 'bookContent',
  BOOK_READ = 'bookRead',

  IDEAS = 'ideas',
  IDEAS_EDIT = 'ideasEdit',
  IDEAS_CONTENT = 'ideasContent',
  IDEAS_DETAILS = 'ideasDetails',
  IDEAS_OBSERVE = 'ideasObserve',

  PROFILE = 'profile',
  PROFILE_EDIT = 'profileEdit',

  SETTINGS = 'settings',
}

export type RootStackParamList = {
  [Screens.TRACK]: undefined;
  [Screens.ADD_TRACK]: {track: Track} | undefined;
  [Screens.TRACK_DETAILS]: {track: Track};

  [Screens.BOOK]: undefined;
  [Screens.BOOK_DETAILS]: {book: Book};
  [Screens.ADD_BOOK]: {book: Book} | undefined;
  [Screens.BOOK_CONTENT]: {bookId: number; pages?: Page[]};
  [Screens.BOOK_READ]: {book: Book};

  [Screens.IDEAS]: undefined;
  [Screens.IDEAS_EDIT]: {idea: Idea} | undefined;
  [Screens.IDEAS_CONTENT]: {
    cover?: string | null;
    boardName?: string;
    ideaId?: number;
    contentId?: number;
  };
  [Screens.IDEAS_DETAILS]: {id: number};
  [Screens.IDEAS_OBSERVE]: {idea: Idea; content: IdeaContent};

  [Screens.PROFILE]: undefined;
  [Screens.PROFILE_EDIT]: undefined;

  [Screens.SETTINGS]: undefined;
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

export type UseNavigationProp = NativeStackNavigationProp<RootStackParamList>;
