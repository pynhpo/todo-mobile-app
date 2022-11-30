import React from 'react';
import {Alert} from 'react-native';
import {KeyboardAvoidingScrollView} from '@components/keyboard-avoiding-scroll-view.component';
import {Text, View, Button, Colors} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {Layout} from '@components/layout.component';
import {selectUserEmail} from '@redux/auth/selectors';
import {logoutAction} from '@redux/auth/actions';
import {ArrowUpSvg} from '@components/svg/arrow-up-svg';

export const ProfileScreen = (): React.ReactElement => {
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();
  const onLogout = () => {
    Alert.alert('Are you sure?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => dispatch(logoutAction())},
    ]);
  };
  return (
    <Layout style={styles.root}>
      <KeyboardAvoidingScrollView>
        <View flex-1 centerV paddingH-25 paddingT-120>
          <Text blue50 text20 marginB-32>
            {`Hi!\n`}
            <Text blue50 text50>
              {`${userEmail}`}
            </Text>
          </Text>
          <View right>
            <Button
              link
              text90
              blue50
              backgroundColor={Colors.orange40}
              label="Logout"
              onPress={onLogout}
              iconSource={() => (
                <ArrowUpSvg
                  width={18}
                  height={18}
                  style={styles.arrowIcon}
                  fill={Colors.blue50}
                />
              )}
              iconOnRight
            />
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </Layout>
  );
};
