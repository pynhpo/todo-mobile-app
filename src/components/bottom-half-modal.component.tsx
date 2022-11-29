import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import Modal, {ModalProps} from 'react-native-modal';
import {View, Colors} from 'react-native-ui-lib';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export interface BottomHalfModalProps extends ModalProps {}

export const BottomHalfModal: FC<Partial<BottomHalfModalProps>> = (
  props,
): React.ReactElement => {
  const {children, ...restProps} = props;
  const {bottom} = useSafeAreaInsets();
  return (
    <Modal
      statusBarTranslucent={true}
      useNativeDriverForBackdrop={true}
      useNativeDriver={true}
      style={styles.bottomModal}
      {...restProps}>
      <View style={[styles.container, {paddingBottom: bottom}]}>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomModal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    padding: 16,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: Colors.white,
  },
});
