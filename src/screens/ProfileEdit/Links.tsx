import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Input from '@/components/ui/Input';
import DeleteIcon from '@/assets/icons/delete.svg';
import Label from '@/components/ui/Label';

interface Props {
  data: string;
  onChange: (data: string, index: number) => void;
  index: number;
  onDelete: (index: number) => void;
}

export default function Links({data, onChange, index, onDelete}: Props) {
  return (
    <View style={{width: '100%', gap: 5}}>
      {index && (
        <View style={{flexDirection: 'row-reverse'}}>
          <TouchableOpacity
            style={{width: 20, height: 20}}
            onPress={() => onDelete(index)}>
            <DeleteIcon width={20} height={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          width: '100%',
          gap: 10,
          backgroundColor: '#2F2F31',
          padding: 10,
          borderRadius: 10,
        }}>
        <View style={styles.inputBlock}>
          <Label title="Name of the social network" style={{marginLeft: 5}} />
          <Input
            value={data}
            onChangeText={text => onChange(text, index)}
            placeholder="Enter the link here"
            style={{backgroundColor: '#5D5D5D'}}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBlock: {
    width: '100%',
    backgroundColor: '#5D5D5D',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 7,
    gap: 2,
  },
});
