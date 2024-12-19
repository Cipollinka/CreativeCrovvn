import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import Row from '@/components/layout/Row';
import PlayIcon from '@/assets/icons/play.svg';
import SkipRight from '@/assets/icons/skipLeft.svg';
import SkipLeft from '@/assets/icons/skipRight.svg';

interface Props {
  isPaused: boolean;
  onPress: () => void;
  onSkipLeft: () => void;
  onSkipRight: () => void;
  isSkipLeftDisabled: boolean;
  isSkipRightDisabled: boolean;
}

export default function Play({
  isPaused,
  onPress,
  onSkipLeft,
  onSkipRight,
  isSkipLeftDisabled,
  isSkipRightDisabled,
}: Props) {
  return (
    <Row
      gap={40}
      style={{width: '100%', justifyContent: 'center', marginTop: 10}}>
      <TouchableOpacity disabled={isSkipLeftDisabled} onPress={onSkipLeft}>
        <SkipLeft style={{opacity: isSkipLeftDisabled ? 0.5 : 1}} />
      </TouchableOpacity>

      <TouchableOpacity style={{width: 75, height: 75}} onPress={onPress}>
        <View
          style={{
            marginTop: 0,
            width: 75,
            height: 75,
            borderRadius: 9999,
            backgroundColor: '#ABABAB',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isPaused ? (
            <View>
              <PlayIcon color={'#2F2F31'} width={30} height={30} />
            </View>
          ) : (
            <Row gap={10}>
              <View
                style={{
                  borderRadius: 9999,
                  width: 6,
                  height: 26,
                  backgroundColor: '#2F2F31',
                }}
              />
              <View
                style={{
                  borderRadius: 9999,
                  width: 6,
                  height: 26,
                  backgroundColor: '#2F2F31',
                }}
              />
            </Row>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity disabled={isSkipRightDisabled} onPress={onSkipRight}>
        <SkipRight style={{opacity: isSkipRightDisabled ? 0.5 : 1}} />
      </TouchableOpacity>
    </Row>
  );
}
