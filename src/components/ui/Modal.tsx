import React from 'react';
import {View, Modal, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const CustomModal = ({isVisible, children, onClose}: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}
          onTouchEnd={e => {
            e.stopPropagation();
          }}>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    borderRadius: 31,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 'auto',
  },
});

export default CustomModal;
