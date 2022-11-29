import React, {useState, FC} from 'react';
import {KeyboardAvoidingScrollView} from '@components/keyboard-avoiding-scroll-view.component';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
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
import {Platform, ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';
import {Layout} from '@components/layout.component';
import {ImageUploadSvg} from '@components/svg/image-upload-svg';
import {colors} from '@theme/colors';
import {NavigationService} from '@services/navigation.service';
import {setOverlayLoadingModalState} from '@redux/modal/overlayLoading/slice';
import {
  addNewTodoItemAction,
  updateTodoItemAction,
} from '@redux/todo/item/actions';
import {Repeat, Priority, TodoItemResponse} from '@type/api';
import {Route} from '@type/navigation';

const repeatOptions: Array<{label: string; value: Repeat}> = [
  {label: 'None', value: 'none'},
  {label: 'Everyday', value: 'everyday'},
];

const priorityOptions: Array<{label: string; value: Priority}> = [
  {label: 'Normal', value: 'normal'},
  {label: 'Medium', value: 'medium'},
  {label: 'High', value: 'high'},
  {label: 'Highest', value: 'highest'},
];

const {TextField} = Incubator;

interface DetailsScreenProps extends Route<TodoItemResponse> {}

export const DetailsScreen: FC<DetailsScreenProps> = (
  props,
): React.ReactElement => {
  const params = props?.route?.params;
  const isEditing = !!params?.uid;
  const dispatch = useDispatch();
  const [title, setTitle] = useState(params?.title || '');
  const [content, setContent] = useState(params?.content || '');
  const [appliedDate, setAppliedDate] = useState<Date>(
    params?.appliedAt ? new Date(params?.appliedAt) : new Date(),
  );
  const [dueDate, setDueDate] = useState<Date | undefined>(
    params?.dueAt ? new Date(params?.dueAt) : undefined,
  );
  const [dueTime, setDueTime] = useState<Date | undefined>(
    params?.dueAt ? new Date(params?.dueAt) : undefined,
  );
  const [repeat, setRepeat] = useState<Repeat>(
    params?.repeat || repeatOptions[0].value,
  );
  const [priority, setPriority] = useState<Priority>(
    params?.priority || priorityOptions[0].value,
  );
  const [imageUrl, setImageUrl] = useState<string>(params?.imageUrl || '');

  const onSave = () => {
    if (!title) {
      return;
    }
    const oneDayInMillisecond = 24 * 60 * 60 * 1000;
    const dueAt = dueDate
      ? Math.floor((dueDate?.getTime() || 0) / oneDayInMillisecond) *
          oneDayInMillisecond +
        (dueTime ? (dueTime?.getTime() || 0) % oneDayInMillisecond : 0)
      : undefined;

    const body = {
      title,
      content,
      appliedAt: appliedDate?.getTime(),
      dueAt,
      imageUrl,
      priority,
      repeat,
    };
    dispatch(
      isEditing
        ? updateTodoItemAction({...body, uid: params?.uid})
        : addNewTodoItemAction(body),
    );
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
      if (uri) {
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        await storage().ref(filename).putFile(uploadUri);
        const downloadURL = await storage().ref(filename).getDownloadURL();
        setImageUrl(downloadURL);
        // setIsUploadingImage(false);
        dispatch(setOverlayLoadingModalState({visible: false}));
      }
    } catch (err) {
      dispatch(setOverlayLoadingModalState({visible: false}));
    }
  };

  return (
    <Layout useSafeAreaView style={styles.root}>
      <View row spread centerV marginB-16>
        <Button link label="Cancel" onPress={NavigationService.goBack} />
        <Text grey10>Details</Text>
        <Button link label={isEditing ? 'Save' : 'Add'} onPress={onSave} />
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
              setAppliedDate(date);
            }}
            value={appliedDate}
          />
          <View style={styles.gap} />
          <DateTimePicker
            title={'Due date'}
            placeholder={'Due date'}
            mode={'date'}
            onChange={(date: Date) => setDueDate(date)}
            value={dueDate}
          />
          <DateTimePicker
            title={'Due time'}
            placeholder={'Due time'}
            mode={'time'}
            onChange={(date: Date) => setDueTime(date)}
            value={dueTime}
          />
        </View>

        <Picker
          title="Repeat"
          placeholder="Pick a item"
          useNativePicker
          enableModalBlur
          // useWheelPicker
          value={repeat}
          onChange={(value: any) => setRepeat(value)}
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
          onChange={(value: any) => {
            setPriority(value);
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
