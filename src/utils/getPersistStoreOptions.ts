import AsyncStorage from '@react-native-async-storage/async-storage';

export const getPersistStoreOptions = (name: string) => ({
  storage: {
    getItem: async (key: string) => {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    },
    setItem: async (key: string, value: any) => {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: async (key: string) => {
      await AsyncStorage.removeItem(key);
    },
  },
  name,
});
