export interface TextData {
  initialTime: string;
  endTime: string;
  text: string;
}

export interface Track {
  id: number;
  title: string;
  artist: string;
  cover?: string;
  audioPath: string;
  textData: TextData[];
}

export interface CoAuthor {
  name: string;
  surname: string;
}

export interface User {
  avatar: string;
  name: string;
  surname: string;
  description: string;
  links: string[];
}

export const genreData = [
  {label: 'Fiction'},
  {label: 'Fantasy'},
  {label: 'Science'},
  {label: 'Historical Fiction'},
  {label: 'Mystery'},
  {label: 'Thriller'},
  {label: 'Poetry'},
  {label: 'Drama'},
  {label: 'Horror'},
  {label: 'Romance'},
  {label: 'Travel'},
  {label: 'Self-Help'},
  {label: 'Autobiography'},
  {label: 'Biography'},
  {label: 'Comedy'},
];

export type Genre = (typeof genreData)[number]['label'];

export interface Page {
  title: string;
  text: string;
}

export interface Book {
  id: number;
  title: string;
  description: string;
  authorName: string;
  authorSurname: string;
  cover?: string;
  genres: Genre[];
  coAuthors?: CoAuthor[];
  pages: Page[];
  isCompleted: boolean;
}

export interface IdeaContent {
  id: number;
  name: string;
  text: string;
  covers?: string[];
}

export interface Idea {
  id: number;
  name: string;
  cover?: string;
  content: IdeaContent[];
}
