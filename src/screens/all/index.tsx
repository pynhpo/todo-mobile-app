import React, {useRef, useState} from 'react';
import {KeyboardAvoidingScrollView} from '@components/keyboard-avoiding-scroll-view.component';
import {loginAction} from '@redux/auth/actions';
import {
  Text,
  View,
  Button,
  Incubator,
  TouchableOpacity,
} from 'react-native-ui-lib';
import {TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';
import {Controller, useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from '@constants/validation-schema.constant';
import {Layout} from '@components/layout.component';
import {SearchSvg} from '@components/svg/search-svg';
import {FilterSvg} from '@components/svg/filter-svg';
import {GreenPlusSvg} from '@components/svg/green-plus-svg';
import {colors} from '@theme/colors';
import {NavigationService} from '@services/navigation.service';
import {SCREEN_NAME} from '@constants/navigation.constant';

const {TextField} = Incubator;

type FormValues = {
  email: string;
  password: string;
};

export const AllScreen = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const passwordInput =
    useRef<TextInput>() as React.MutableRefObject<TextInput>;

  const {handleSubmit, control} = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    dispatch(loginAction({email: data.email, password: data.password}));
  };

  return (
    <Layout style={styles.root}>
      <KeyboardAvoidingScrollView>
        <View row center>
          <TextField
            returnKeyType={'search'}
            placeholder="search title"
            grey10
            value={searchText}
            onChangeText={setSearchText}
            autoCapitalize="none"
            leadingAccessory={
              <SearchSvg width={18} height={18} style={styles.searchIcon} />
            }
            containerStyle={styles.searchInput}
          />
          <FilterSvg
            width={18}
            height={18}
            fill={colors.gray}
            style={styles.filterIcon}
          />
        </View>
      </KeyboardAvoidingScrollView>
      <TouchableOpacity
        style={styles.greenPlusIconCover}
        onPress={() => {
          NavigationService.navigate(SCREEN_NAME.details);
        }}>
        <GreenPlusSvg width={48} height={48} />
      </TouchableOpacity>
    </Layout>
  );
};
