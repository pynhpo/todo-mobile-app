import React, {useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {View, TextField, Text, Button} from 'react-native-ui-lib';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onLogin = useCallback(async () => {
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {}
  }, [email, password]);

  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View flex paddingH-25 paddingT-120>
            <Text blue50 text20 marginB-16>
              Welcome
            </Text>
            <TextField
              text50
              placeholder="email"
              grey10
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <TextField
              autoCapitalize="none"
              text50
              placeholder="password"
              secureTextEntry
              grey10
              value={password}
              onChangeText={setPassword}
            />
            <View marginT-100 center>
              <Button
                text70
                white
                background-orange30
                label="Login"
                onPress={onLogin}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
