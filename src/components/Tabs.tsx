import React, {useEffect, useRef} from 'react';
import {View, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import CustomText from './ui/Text';

interface Props<T> {
  currentTab: T;
  onChangeTab: (tab: T) => void;
  tabs: string[];
}

function TabSelector<T extends number>({
  currentTab,
  onChangeTab,
  tabs,
}: Props<T>) {
  console.log('currentTab', currentTab);

  const indicatorPosition = useRef(new Animated.Value(1)).current;

  const handlePress = (index: T) => {
    onChangeTab(index);
    Animated.spring(indicatorPosition, {
      toValue: index,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    Animated.spring(indicatorPosition, {
      toValue: currentTab,
      useNativeDriver: true,
    }).start();
  }, [currentTab, indicatorPosition]);

  const indicatorWidth = 100 / tabs.length;

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [
                {
                  translateX: indicatorPosition.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [
                      0,
                      indicatorWidth * 3.4,
                      indicatorWidth * 7.1,
                    ],
                  }),
                },
              ],
              width: `${indicatorWidth}%`,
            },
          ]}
        />
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => handlePress(index)}>
            <CustomText
              fs={14}
              fw="medium"
              color={currentTab === index ? '#000' : '#ABABAB'}>
              {tab}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#2F2F31',
    borderRadius: 14,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  selectedText: {
    color: '#000',
  },
  indicator: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#FFD214',
    borderRadius: 14,
  },
});

export default TabSelector;
