import {Book, Idea, IdeaContent, Track, User} from '@/types/common';
import {getPersistStoreOptions} from '@/utils/getPersistStoreOptions';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface State {
  username: string;
  setUsername: (username: string) => void;

  avatar: string;
  setAvatar: (avatar: string) => void;

  isTermsAccepted: boolean;
  setIsTermsAccepted: (isTermsAccepted: boolean) => void;

  tracks: Track[];
  addTrack: (tracks: Omit<Track, 'id'>) => void;
  removeTrack: (trackId: number) => void;

  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => number;
  editBook: (bookId: number, book: Partial<Book>) => void;
  removeBook: (bookId: number) => void;

  ideas: Idea[];
  addIdea: (idea: Omit<Idea, 'id'>) => number;
  editIdea: (ideaId: number, idea: Partial<Idea>) => void;
  removeIdea: (ideaId: number) => void;

  addIdeaContent: (ideaId: number, content: Omit<IdeaContent, 'id'>) => void;
  removeIdeaContent: (ideaId: number, contentId: number) => void;
  editIdeaContent: (
    ideaId: number,
    contentId: number,
    content: Partial<IdeaContent>,
  ) => void;

  user: User;
  setUser: (user: User) => void;
}

export const useUserStore = create(
  persist<State>(
    (set, get) => ({
      username: '',
      setUsername: (username: string) => set({username}),

      avatar: '',
      setAvatar: (avatar: string) => set({avatar}),

      isTermsAccepted: false,
      setIsTermsAccepted: (isTermsAccepted: boolean) => set({isTermsAccepted}),

      tracks: [],
      addTrack: track => {
        const tracks = get().tracks;
        const lastId = tracks[tracks.length - 1]?.id;
        const newTrack = {...track, id: lastId !== undefined ? lastId + 1 : 0};
        set({tracks: [...tracks, newTrack]});
      },
      removeTrack: trackId =>
        set({tracks: get().tracks.filter(track => track.id !== trackId)}),

      books: [],
      addBook: book => {
        const books = get().books;
        const lastId = books?.[books?.length - 1]?.id;
        const newId = lastId !== undefined ? lastId + 1 : 0;
        const newBook = {...book, id: newId};
        set({books: [...books, newBook]});

        return newId;
      },
      removeBook: bookId =>
        set({books: get().books.filter(book => book.id !== bookId)}),
      editBook: (bookId, book) => {
        console.log('editBook bookId', bookId);
        console.log('editBook book', book);

        const books = get().books;
        const bookIndex = books.findIndex(book => book.id === bookId);
        console.log('bookIndex', bookIndex);

        if (bookIndex === -1) return;
        const currentBook = books[bookIndex];
        const newBook = {...currentBook, ...book};

        set({
          books: [
            ...books.slice(0, bookIndex),
            newBook,
            ...books.slice(bookIndex + 1),
          ],
        });
      },

      ideas: [],
      addIdea: idea => {
        const ideas = get().ideas;
        const lastId = ideas[ideas.length - 1]?.id;
        const newIdea = {...idea, id: lastId !== undefined ? lastId + 1 : 0};
        set({ideas: [...ideas, newIdea]});

        return newIdea.id;
      },
      removeIdea: ideaId =>
        set({ideas: get().ideas.filter(idea => idea.id !== ideaId)}),
      editIdea: (ideaId, idea) => {
        console.log('editIdea ideaId', ideaId);
        console.log('editIdea idea', idea);

        const ideas = get().ideas;
        const ideaIndex = ideas.findIndex(idea => idea.id === ideaId);
        console.log('ideaIndex', ideaIndex);

        if (ideaIndex === -1) return;
        const currentIdea = ideas[ideaIndex];
        const newIdea = {...currentIdea, ...idea};

        set({
          ideas: [
            ...ideas.slice(0, ideaIndex),
            newIdea,
            ...ideas.slice(ideaIndex + 1),
          ],
        });
      },

      addIdeaContent: (ideaId, content) => {
        const ideas = get().ideas;
        const ideaIndex = ideas.findIndex(idea => idea.id === ideaId);
        console.log('ideaIndex', ideaIndex);

        if (ideaIndex === -1) return;
        const currentIdea = ideas[ideaIndex];
        const nextId = currentIdea?.content?.length || 0;
        const newContent = {...content, id: nextId};

        set({
          ideas: [
            ...ideas.slice(0, ideaIndex),
            {
              ...currentIdea,
              content: [...currentIdea.content, newContent],
            },
            ...ideas.slice(ideaIndex + 1),
          ],
        });

        return newContent.id;
      },
      removeIdeaContent: (ideaId, contentId) => {
        const ideas = get().ideas;
        const ideaIndex = ideas.findIndex(idea => idea.id === ideaId);
        console.log('ideaIndex', ideaIndex);

        if (ideaIndex === -1) return;
        const currentIdea = ideas[ideaIndex];
        const newContent = [...currentIdea.content];
        newContent.splice(contentId, 1);

        set({
          ideas: [
            ...ideas.slice(0, ideaIndex),
            {
              ...currentIdea,
              content: newContent,
            },
            ...ideas.slice(ideaIndex + 1),
          ],
        });
      },
      editIdeaContent: (ideaId, contentId, content) => {
        const ideas = get().ideas;
        const ideaIndex = ideas.findIndex(idea => idea.id === ideaId);
        console.log('ideaIndex', ideaIndex);

        if (ideaIndex === -1) return;
        const currentIdea = ideas[ideaIndex];
        const newContent = [...currentIdea.content];
        newContent[contentId] = {...newContent[contentId], ...content};

        set({
          ideas: [
            ...ideas.slice(0, ideaIndex),
            {
              ...currentIdea,
              content: newContent,
            },
            ...ideas.slice(ideaIndex + 1),
          ],
        });
      },

      user: {
        avatar: '',
        name: '',
        surname: '',
        description: '',
        links: [],
      },
      setUser: user => set({user}),
    }),

    getPersistStoreOptions('user'),
  ),
);
