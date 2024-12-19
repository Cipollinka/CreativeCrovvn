import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Sound from 'react-native-sound';
import Row from '@/components/layout/Row';
import CustomText from '@/components/ui/Text';
import PlayIcon from '@/assets/icons/play.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import DeleteIcon from '@/assets/icons/delete.svg';

interface Props {
  path: string;
  onDelete: () => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
  const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;

  return `${formattedMins}:${formattedSecs}`;
};

export default function AudioPlayer({path, onDelete}: Props) {
  const [sound, setSound] = useState<Sound | null>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const progressBarWidth = (currentTime / duration) * 100;

  useEffect(() => {
    const newSound = new Sound(path, undefined, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }

      setDuration(newSound.getDuration());
      setSound(newSound);
    });

    return () => {
      newSound.release();
    };
  }, [path]);

  const togglePlayPause = () => {
    if (!sound) return;

    if (playing) {
      sound.stop();
      setPlaying(false);
      setCurrentTime(0);
    } else {
      sound.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (sound) {
      const interval = setInterval(() => {
        sound.getCurrentTime(seconds => {
          setCurrentTime(seconds);
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [sound]);

  return (
    <Row
      style={{
        backgroundColor: '#2F2F31',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 9999,
        gap: 10,
      }}>
      <TouchableOpacity onPress={togglePlayPause}>
        {playing ? (
          <PauseIcon width={20} height={20} />
        ) : (
          <PlayIcon width={20} height={20} />
        )}
      </TouchableOpacity>

      <CustomText fs={14} style={{width: 80}}>
        {formatTime(currentTime)}/{formatTime(duration)}
      </CustomText>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, {width: `${progressBarWidth}%`}]} />
      </View>

      <TouchableOpacity onPress={onDelete}>
        <DeleteIcon width={20} height={20} color={'#fff'} />
      </TouchableOpacity>
    </Row>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 10,
    width: '52%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginVertical: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b5998',
    borderRadius: 5,
  },
});
