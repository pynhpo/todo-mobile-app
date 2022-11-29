import React, {useRef} from 'react';
import {KeyboardAvoidingScrollView} from '@components/keyboard-avoiding-scroll-view.component';
import {loginAction} from '@redux/auth/actions';
import {Text, View, TextField, Button} from 'react-native-ui-lib';
import {TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';
import {Controller, useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from '@constants/validation-schema.constant';
import {Layout} from '@components/layout.component';

type FormValues = {
  email: string;
  password: string;
};

export const LoginScreen = (): React.ReactElement => {
  const dispatch = useDispatch();
  const passwordInput =
    useRef<TextInput>() as React.MutableRefObject<TextInput>;

  const {handleSubmit, control} = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    dispatch(loginAction({email: data.email, password: data.password}));
  };

  return (
    <Layout useSafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingScrollView>
        <View flex paddingH-25 paddingT-120>
          <Text blue50 text20 marginB-16>
            Welcome
          </Text>
          <Controller
            control={control}
            render={({fieldState, field}) => (
              <TextField
                returnKeyType={'next'}
                text50
                placeholder="email"
                grey10
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                onSubmitEditing={() => {
                  passwordInput && passwordInput.current.focus();
                }}
                validate={() => fieldState?.error}
                validationMessage={fieldState?.error?.message}
                autoCapitalize="none"
                enableErrors
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            render={({fieldState, field}) => (
              <TextField
                autoCapitalize="none"
                text50
                placeholder="password"
                ref={passwordInput}
                secureTextEntry
                grey10
                value={field.value}
                onChangeText={field.onChange}
                onSubmitEditing={handleSubmit(onSubmit)}
                validate={() => fieldState?.error}
                validationMessage={fieldState?.error?.message}
                enableErrors
              />
            )}
            name="password"
          />

          <View marginT-100 center>
            <Button
              text70
              white
              background-orange30
              label="Login"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </Layout>
  );
};
