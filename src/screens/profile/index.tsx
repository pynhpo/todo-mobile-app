import React from 'react';
import {KeyboardAvoidingScrollView} from '@components/keyboard-avoiding-scroll-view.component';
import {Text, View, Button} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {Layout} from '@components/layout.component';
import {selectUserEmail} from '@redux/auth/selectors';
import {logoutAction} from '@redux/auth/actions';

export const ProfileScreen = (): React.ReactElement => {
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();
  return (
    <Layout useSafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingScrollView>
        <View flex paddingH-25 paddingT-120>
          <Text blue50 text20 marginB-16>
            {`Hi ${userEmail}`}
          </Text>
          <View marginT-100 center>
            <Button
              text70
              white
              background-orange30
              label="Logout"
              onPress={() => {
                dispatch(logoutAction());
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </Layout>
  );
};
