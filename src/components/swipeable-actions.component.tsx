import React, {
  memo,
  useMemo,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  PropsWithChildren,
} from 'react';
import Swipeable from 'react-native-swipeable';
import {StyleSheet} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import {TouchableOpacity, Text} from 'react-native-ui-lib';

interface SwipeableItem {
  onOpen?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onHide?: () => void;
}

const SwipeableAction = forwardRef(
  (
    {
      children,
      onOpen,
      onEdit,
      onDelete,
      onHide,
    }: PropsWithChildren<SwipeableItem>,
    ref,
  ) => {
    const [currentlyOpenSwipeable, setCurrentlyOpenSwipeable] =
      useState<any>(null);

    const onRecenter = useCallback(() => {
      if (currentlyOpenSwipeable) {
        currentlyOpenSwipeable?.recenter?.();
      }
    }, [currentlyOpenSwipeable]);

    const onOpenRelease = useCallback(
      (_event: any, _gestureState: any, swipeable: any) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }
        setCurrentlyOpenSwipeable(swipeable);
      },
      [currentlyOpenSwipeable],
    );

    const onCloseRelease = useCallback(
      () => setCurrentlyOpenSwipeable(null),
      [],
    );

    const rightButtons = useMemo(() => {
      return [
        onOpen ? (
          <TouchableOpacity
            style={[styles.rightSwipeItem, styles.open]}
            onPress={() => {
              onRecenter();
              onOpen();
            }}>
            <Text white>Open</Text>
          </TouchableOpacity>
        ) : null,
        onEdit ? (
          <TouchableOpacity
            onPress={() => {
              onRecenter();
              onEdit();
            }}
            style={[styles.rightSwipeItem, styles.edit]}>
            <Text white>Edit</Text>
          </TouchableOpacity>
        ) : null,
        onDelete ? (
          <TouchableOpacity
            onPress={() => {
              onRecenter();
              onDelete();
            }}
            style={[styles.rightSwipeItem, styles.delete]}>
            <Text white>Delete</Text>
          </TouchableOpacity>
        ) : null,
        onHide ? (
          <TouchableOpacity
            onPress={() => {
              onRecenter();
              onHide();
            }}
            style={[styles.rightSwipeItem, styles.hide]}>
            <Text white>Hide</Text>
          </TouchableOpacity>
        ) : null,
      ].filter((e: any) => e !== null);
    }, [onDelete, onEdit, onHide, onOpen, onRecenter]);

    useImperativeHandle(
      ref,
      () => {
        return {
          onRecenter,
        };
      },
      [onRecenter],
    );

    return (
      <Swipeable
        rightButtonWidth={64}
        rightButtons={isEmpty(rightButtons) ? undefined : rightButtons}
        onRightButtonsOpenRelease={onOpenRelease}
        onRightButtonsCloseRelease={onCloseRelease}>
        {children}
      </Swipeable>
    );
  },
);

export default memo(SwipeableAction);

const styles = StyleSheet.create({
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  open: {
    backgroundColor: '#28D196',
  },
  edit: {
    backgroundColor: '#3F8CFF',
  },
  delete: {
    backgroundColor: '#ED1C24',
    paddingLeft: 12,
  },
  hide: {
    backgroundColor: '#464655',
  },
});
