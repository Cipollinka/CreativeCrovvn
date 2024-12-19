import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Input from '@/components/ui/Input';
import {CoAuthor} from '@/types/common';
import DeleteIcon from '@/assets/icons/delete.svg';
import Label from '@/components/ui/Label';

interface Props {
  data: CoAuthor;
  onChange: (data: CoAuthor, index: number) => void;
  index: number;
  onDelete: (index: number) => void;
}

export default function CoAuthors({data, onChange, index, onDelete}: Props) {
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
          <Label title="Name" style={{marginLeft: 5}} />
          <Input
            value={data.name}
            onChangeText={text => onChange({...data, name: text}, index)}
            placeholder="Enter the author's name"
            style={{backgroundColor: '#5D5D5D'}}
          />
        </View>

        <View style={styles.inputBlock}>
          <Label title="Surname" style={{marginLeft: 5}} />
          <Input
            value={data.surname}
            onChangeText={text => onChange({...data, surname: text}, index)}
            placeholder="Enter the author's last name"
            textAlignVertical="top"
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
