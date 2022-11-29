import React, {useRef, useState} from 'react';
import {KeyboardAvoidingScrollView} from '@components/keyboard-avoiding-scroll-view.component';
import {loginAction} from '@redux/auth/actions';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import map from 'lodash/map';
import {
  Text,
  View,
  Button,
  Incubator,
  TouchableOpacity,
  DateTimePicker,
  Picker,
  AnimatedImage,
} from 'react-native-ui-lib';
import {TextInput, Platform, ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';
import {Controller, useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from '@constants/validation-schema.constant';
import {Layout} from '@components/layout.component';
import {SearchSvg} from '@components/svg/search-svg';
import {FilterSvg} from '@components/svg/filter-svg';
import {GreenPlusSvg} from '@components/svg/green-plus-svg';
import {ImageUploadSvg} from '@components/svg/image-upload-svg';
import {colors} from '@theme/colors';
import {NavigationService} from '@services/navigation.service';
import {setOverlayLoadingModalState} from '@redux/modal/overlayLoading/slice';

const repeatOptions = [
  {label: 'None', value: 'none'},
  {label: 'Everyday', value: 'everyday'},
];

const priorityOptions = [
  {label: 'Normal', value: 'normal'},
  {label: 'Medium', value: 'medium'},
  {label: 'High', value: 'high'},
  {label: 'Highest', value: 'highest'},
];

const {TextField} = Incubator;

type FormValues = {
  email: string;
  password: string;
};

export const DetailsScreen = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [appliedDate, setAppliedDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const [dueDate, setDueDate] = useState<Date>();
  const [dueTime, setDueTime] = useState<Date>();
  const [repeat, setRepeat] = useState<string>(repeatOptions[0].value);
  const [priority, setPriority] = useState<string>(priorityOptions[0].value);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  const passwordInput =
    useRef<TextInput>() as React.MutableRefObject<TextInput>;

  const {handleSubmit, control} = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    dispatch(loginAction({email: data.email, password: data.password}));
  };

  const onLaunchImageLibrary = async () => {
    try {
      // setIsUploadingImage(true);
      dispatch(setOverlayLoadingModalState({visible: true}));
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
      });
      const uri = result.assets?.[0]?.uri;
      console.log(1111111, uri);
      if (uri) {
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        await storage().ref(filename).putFile(uploadUri);
        console.log(999999);
        const downloadURL = await storage().ref(filename).getDownloadURL();
        setImageUrl(downloadURL);
        // setIsUploadingImage(false);
        dispatch(setOverlayLoadingModalState({visible: false}));
      }
    } catch (err) {
      dispatch(setOverlayLoadingModalState({visible: false}));
      console.log(44444, err);
    }
  };
  console.log(33333, utils.FilePath.PICTURES_DIRECTORY);
  return (
    <Layout useSafeAreaView style={styles.root}>
      <View row spread centerV marginB-16>
        <Button link label="Cancel" onPress={NavigationService.goBack} />
        <Text grey10>Details</Text>
        <Button link label="Add" />
      </View>
      <KeyboardAvoidingScrollView>
        <View style={styles.mainContentCover} marginB-16>
          <TextField
            returnKeyType={'next'}
            placeholder="title"
            grey10
            value={title}
            onChangeText={setTitle}
            floatingPlaceholder
          />
          <View style={styles.gap} />
          <TextField
            // returnKeyType={'next'}
            placeholder="content"
            grey10
            value={content}
            onChangeText={setContent}
            floatingPlaceholder
            multiline
            // containerStyle={styles.searchInput}
          />
        </View>
        <View style={styles.dateCover}>
          <DateTimePicker
            title={'Applied date'}
            placeholder={'Applied date'}
            mode={'date'}
            onChange={(date: Date) => {
              setAppliedDate(new Date(date).toISOString().split('T')[0]);
            }}
            value={new Date(appliedDate)}
          />
          <View style={styles.gap} />
          <DateTimePicker
            title={'Due date'}
            placeholder={'Due date'}
            mode={'date'}
            onChange={(date: Date) => setDueDate(date)}
          />
          <DateTimePicker
            title={'Due time'}
            placeholder={'Due time'}
            mode={'time'}
            onChange={(date: Date) => setDueTime(date)}
          />
        </View>

        <Picker
          title="Repeat"
          placeholder="Pick a item"
          useNativePicker
          enableModalBlur
          // useWheelPicker
          value={repeat}
          onChange={(value: string) => setRepeat(value)}
          // rightIconSource={dropdown}
          // containerStyle={{marginTop: 20}}
          // renderPicker={() => {
          //   return (
          //     <View>
          //       <Text>Open Native Picker!</Text>
          //     </View>
          //   );
          // }}
          // renderNativePicker={props => {
          //   return (
          //     <View flex bg-red50>
          //       <Text>CUSTOM NATIVE PICKER</Text>
          //     </View>
          //   );
          // }}
          // topBarProps={{doneLabel: 'YES', cancelLabel: 'NO'}}
        >
          {map(repeatOptions, option => (
            <Picker.Item
              key={option.value}
              value={option.value}
              label={option.label}
              // disabled={option.disabled}
            />
          ))}
        </Picker>

        <Picker
          title="Priority"
          placeholder="Pick a item"
          enableModalBlur
          useNativePicker
          value={priority}
          onChange={(value: string) => {
            setPriority(value);
            console.log(11111, value);
          }}
          // rightIconSource={dropdown}
          // containerStyle={{marginTop: 20}}
          // renderPicker={() => {
          //   return (
          //     <View>
          //       <Text>Open Native Picker!</Text>
          //     </View>
          //   );
          // }}
          // renderNativePicker={props => {
          //   return (
          //     <View flex bg-red50>
          //       <Text>CUSTOM NATIVE PICKER</Text>
          //     </View>
          //   );
          // }}
          // topBarProps={{doneLabel: 'YES', cancelLabel: 'NO'}}
        >
          {map(priorityOptions, option => (
            <Picker.Item
              key={option.value}
              value={option.value}
              label={option.label}
              // disabled={option.disabled}
            />
          ))}
        </Picker>
        <TouchableOpacity onPress={onLaunchImageLibrary}>
          {!imageUrl ? (
            <View style={styles.imageUploadPlaceholder}>
              <ImageUploadSvg width={48} height={48} />
            </View>
          ) : (
            <AnimatedImage
              containerStyle={{
                backgroundColor: colors.layoutLevel2,
              }}
              style={{resizeMode: 'cover', height: 200}}
              source={{uri: imageUrl}}
              loader={<ActivityIndicator color={colors.primary} />}
              animationDuration={300}
            />
          )}
        </TouchableOpacity>
      </KeyboardAvoidingScrollView>
    </Layout>
  );
};
