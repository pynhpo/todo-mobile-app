import React, {FC, PropsWithChildren} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewProps,
  ViewStyle,
  StyleSheet,
} from 'react-native';

export interface KeyboardAwareScrollViewProps
  extends PropsWithChildren<ViewProps> {
  bounces?: boolean;
  contentContainerStyle?: ViewStyle;
}

const defaultProps: KeyboardAwareScrollViewProps = {
  bounces: false,
  children: null,
  contentContainerStyle: {},
};

export const KeyboardAvoidingScrollView: FC<KeyboardAwareScrollViewProps> = (
  props,
): React.ReactElement => {
  const {bounces, children, contentContainerStyle} = {
    ...defaultProps,
    ...props,
  };
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        bounces={bounces}
        style={styles.scrollView}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});
