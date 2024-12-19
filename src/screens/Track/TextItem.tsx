import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Row from '@/components/layout/Row';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import {TextData} from '@/types/common';
import DeleteIcon from '@/assets/icons/delete.svg';

interface Props {
  data: TextData;
  onChange: (data: TextData, index: number) => void;
  index: number;
  onDelete: (index: number) => void;
}

export default function TextItem({data, onChange, index, onDelete}: Props) {
  const [height, setHeight] = useState(40);
  const [prevLines, setPrevLines] = useState(1);

  const calculateHeight = (input: string) => {
    const lineBreaks = input.split('\n').length;

    const lines = lineBreaks || 1;
    const lineHeight = 24;
    const padding = 20;
    return lines * lineHeight + padding;
  };

  const handleTextChange = (input: string) => {
    onChange({...data, text: input}, index);
    const lineBreaks = input.split('\n').length;

    if (prevLines === lineBreaks) return;
    setPrevLines(lineBreaks);

    setHeight(calculateHeight(input));
  };

  return (
    <View style={{width: '100%', gap: 10}}>
      {index && (
        <View style={{flexDirection: 'row-reverse'}}>
          <TouchableOpacity
            style={{width: 20, height: 20}}
            onPress={() => onDelete(index)}>
            <DeleteIcon width={20} height={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
      )}
      <Row style={{width: '100%', justifyContent: 'space-between'}}>
        <Input
          style={{
            width: '48%',
            paddingHorizontal: 10,
            height: 40,
          }}
          value={data.initialTime}
          onChangeText={text => onChange({...data, initialTime: text}, index)}
          placeholder="Initial time"
        />
        <Input
          style={{
            width: '48%',
            paddingHorizontal: 10,
            height: 40,
          }}
          value={data.endTime}
          onChangeText={text => onChange({...data, endTime: text}, index)}
          placeholder="The End time"
        />
      </Row>

      <View style={styles.inputBlock}>
        <Label title="Text" style={{marginLeft: 5}} />
        <Input
          style={{width: '100%', maxWidth: '100%', height}}
          placeholder="Enter the lyrics here..."
          multiline
          value={data.text}
          onChangeText={handleTextChange}
          onContentSizeChange={event => {
            console.log(
              'event.nativeEvent.contentSize.height',
              event.nativeEvent.contentSize.height,
            );

            setHeight(event.nativeEvent.contentSize.height);
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  inputBlock: {
    width: '100%',
    backgroundColor: '#2F2F31',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 7,
    gap: 2,
  },
});
