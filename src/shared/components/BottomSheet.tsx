import React from 'react';
import {
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: string;
};

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  height = 'h-2/3',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50 justify-end">
          <TouchableWithoutFeedback>
            <View className={`bg-white rounded-t-3xl ${height}`}>
              <View className="items-center py-3">
                <View className="w-12 h-1 bg-gray-300 rounded-full" />
              </View>
              <ScrollView className="flex-1 px-6 pb-6">{children}</ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
