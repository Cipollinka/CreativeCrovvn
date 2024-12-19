import {View, StyleSheet, Animated} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Sound from 'react-native-sound';
import Play from './Play';
import Row from '@/components/layout/Row';
import CustomText from '@/components/ui/Text';
import {Track as TrackType} from '@/types/common';
import {useUserStore} from '@/stores/userStore';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';

interface Props {
  audioPath: string;
  track: TrackType;
}

export default function Track({audioPath, track}: Props) {
  const nav = useNavigation<UseNavigationProp>();
  const tracks = useUserStore(state => state.tracks);

  const index = useMemo(
    () => tracks.findIndex(item => track.id === item.id),
    [tracks, track],
  );

  const [bars, setBars] = useState(Array(30).fill(0));
  const [isPaused, setIsPaused] = useState(true);
  const [sound, setSound] = useState<Sound | null>(null);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const generateBars = () => {
    return Array.from({length: 55}, () => Math.random() * 30 + 10);
  };

  useEffect(() => {
    setBars(generateBars());

    const soundInstance = new Sound(audioPath, '', error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      setDuration(soundInstance.getDuration());
      setSound(soundInstance);
    });

    return () => {
      if (soundInstance) {
        soundInstance.release();
      }
    };
  }, [audioPath]);

  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(() => {
        if (sound && !isPaused) {
          sound.getCurrentTime(seconds => {
            setCurrentTime(seconds);
            setProgress(new Animated.Value(seconds / duration));
          });
        }
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isPaused, sound, duration]);

  const playPauseSound = () => {
    if (!sound) return;

    if (!isPaused) {
      sound.pause();
      setIsPaused(true);
    } else {
      sound.play(success => {
        if (success) {
          console.log('Successfully finished playing');
          setIsPaused(true);
          setCurrentTime(0);
          Animated.timing(progress).stop();
          progress.setValue(0);
        } else {
          console.log('Playback failed');
        }
      });
      setIsPaused(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  const onSkipLeft = () => {
    console.log('index', index);

    if (!index) return;

    const newTrack = tracks[index - 1];
    nav.replace(Screens.TRACK_DETAILS, {track: newTrack});
  };

  const onSkipRight = () => {
    if (index <= tracks.length - 1) return;

    const newTrack = tracks[index + 1];
    nav.replace(Screens.TRACK_DETAILS, {track: newTrack});
  };

  return (
    <View>
      <View style={styles.trackLineContainer}>
        {bars.map((height, index) => (
          <View
            key={index}
            style={[
              styles.trackColumn,
              {
                height: height,
                backgroundColor:
                  index / bars.length < progress._value ? '#FFD214' : '#FFFFFF',
              },
            ]}
          />
        ))}
      </View>

      <Row
        style={{
          width: '100%',
          justifyContent: 'space-between',
          marginTop: -17,
        }}>
        <CustomText fs={12} color="#FFD214">
          {formatTime(currentTime)}
        </CustomText>
        <CustomText fs={12} color="#C6C6C6">
          {formatTime(duration)}
        </CustomText>
      </Row>

      <Play
        isPaused={isPaused}
        onPress={playPauseSound}
        onSkipLeft={onSkipLeft}
        onSkipRight={onSkipRight}
        isSkipLeftDisabled={!index}
        isSkipRightDisabled={index <= tracks.length - 1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  trackLineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
    borderRadius: 5,
    overflow: 'hidden',
  },
  trackColumn: {
    width: 4,
    marginHorizontal: 1,
    borderRadius: 999,
  },
});
