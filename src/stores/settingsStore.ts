import {getPersistStoreOptions} from '@/utils/getPersistStoreOptions';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface SettingsState {
  musicVolume: number;
  vibrationForce: number;
  setMusicVolume: (volume: number) => void;
  setVibrationForce: (force: number) => void;

  clear: () => void;
}

export const useSettingsStore = create(
  persist<SettingsState>(
    set => ({
      musicVolume: 0.5,
      vibrationForce: 0.5,
      setMusicVolume: (volume: number) => set({musicVolume: volume}),
      setVibrationForce: (force: number) => set({vibrationForce: force}),

      clear: () => set({musicVolume: 0.5, vibrationForce: 0.5}),
    }),

    getPersistStoreOptions('settings'),
  ),
);
