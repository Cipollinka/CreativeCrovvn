import {Alert} from 'react-native';

interface Props {
  onConfirm: (id: number) => void;
}

export const useDelete = ({onConfirm}: Props) => {
  const showConfirmation = (id: number) => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => onConfirm(id),
        },
      ],
      {cancelable: false},
    );
  };

  return {
    showConfirmation,
  };
};
