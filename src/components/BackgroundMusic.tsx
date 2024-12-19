import {useSettingsStore} from '@/stores/settingsStore';
import React, {useEffect, useRef} from 'react';
import Sound from 'react-native-sound';

const BackgroundMusic: React.FC = () => {
  const musicVolume = useSettingsStore(state => state.musicVolume);
  const soundRef = useRef<Sound | null>(null);

  useEffect(() => {
    soundRef.current = new Sound('bgmusic.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }

      soundRef.current?.setVolume(musicVolume);

      soundRef.current?.play(() => {
        soundRef.current?.setNumberOfLoops(-1);
      });
    });

    return () => {
      soundRef.current?.stop(() => soundRef.current?.release());
    };
  }, [musicVolume]);

  return null;
};

export default BackgroundMusic;
