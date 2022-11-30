import React, {useState, FC, useCallback} from 'react';
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
  Colors,
} from 'react-native-ui-lib';
import {Platform, ActivityIndicator, ViewStyle} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';
import {Layout} from '@components/layout.component';
import {ImageUploadSvg} from '@components/svg/image-upload-svg';
import {NavigationService} from '@services/navigation.service';
import {setOverlayLoadingModalState} from '@redux/modal/overlayLoading/slice';
import {
  addNewTodoItemAction,
  updateTodoItemAction,
} from '@redux/todo/item/actions';
import {Repeat, Priority, TodoItemResponse} from '@type/api';
import {Route} from '@type/navigation';
import {GapLine} from '@components/gap-line.component';

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

interface DetailsScreenProps
  extends Route<TodoItemResponse & {isToday?: boolean}> {}

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
        dispatch(setOverlayLoadingModalState({visible: false}));
      }
    } catch (err) {
      dispatch(setOverlayLoadingModalState({visible: false}));
    }
  };

  const renderResetIcon = useCallback(
    (onPress = () => {}, style: ViewStyle) => {
      return (
        <TouchableOpacity style={style} onPress={onPress}>
          <View
            width={20}
            height={20}
            br100
            backgroundColor={Colors.red20}
            center>
            <Text text90 white>
              x
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [],
  );

  const onResetImageUrl = () => {
    setImageUrl('');
  };

  const onResetDueDate = () => {
    setDueDate(undefined);
    setDueTime(undefined);
  };

  const onResetDueTime = () => {
    setDueTime(undefined);
  };

  return (
    <Layout useSafeAreaView style={styles.root}>
      <View row spread centerV marginB-16>
        <Button
          text80
          link
          label="Cancel"
          color={Colors.blue20}
          onPress={NavigationService.goBack}
        />
        <Text text70 grey10 marginR-8>
          Details
        </Text>
        <Button
          text80
          link
          label={isEditing ? 'Save' : 'Add'}
          onPress={onSave}
          color={Colors.blue20}
          disabled={!title}
        />
      </View>
      <KeyboardAvoidingScrollView>
        <View style={styles.mainContentCover}>
          <TextField
            placeholder="title"
            grey10
            value={title}
            onChangeText={setTitle}
            floatingPlaceholder
          />
          <GapLine marginT-8 />
          <TextField
            placeholder="content"
            grey10
            value={content}
            onChangeText={setContent}
            floatingPlaceholder
            multiline
          />
        </View>
        <View style={styles.dateCover}>
          {!params?.isToday ? (
            <DateTimePicker
              grey10
              text-90
              title="Applied date"
              placeholder="Press to choose"
              mode="date"
              onChange={(date: Date) => {
                setAppliedDate(date);
              }}
              value={appliedDate}
            />
          ) : null}
          <View style={styles.relative}>
            <DateTimePicker
              title="Due date"
              placeholder="Press to choose"
              mode="date"
              onChange={(date: Date) => setDueDate(date)}
              value={dueDate}
            />
            {dueDate
              ? renderResetIcon(onResetDueDate, styles.resetIconOfDueDate)
              : null}
          </View>

          <View style={styles.relative}>
            <DateTimePicker
              title="Due time"
              placeholder="Press to choose"
              mode="time"
              onChange={(date: Date) => setDueTime(date)}
              value={dueTime}
            />
            {dueTime
              ? renderResetIcon(onResetDueTime, styles.resetIconOfDueDate)
              : null}
          </View>
        </View>
        <View style={styles.repeatCover}>
          <Picker
            title="Repeat"
            placeholder="Pick a item"
            useNativePicker
            enableModalBlur
            value={repeat}
            onChange={(value: any) => setRepeat(value)}>
            {map(repeatOptions, option => (
              <Picker.Item
                key={option.value}
                value={option.value}
                label={option.label}
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
            }}>
            {map(priorityOptions, option => (
              <Picker.Item
                key={option.value}
                value={option.value}
                label={option.label}
              />
            ))}
          </Picker>
        </View>

        <TouchableOpacity onPress={onLaunchImageLibrary}>
          {!imageUrl ? (
            <View style={styles.imageUploadPlaceholder}>
              <ImageUploadSvg width={48} height={48} />
            </View>
          ) : (
            <View style={styles.relative}>
              <AnimatedImage
                style={styles.animatedImage}
                containerStyle={styles.animatedImageContainer}
                source={{uri: imageUrl}}
                loader={<ActivityIndicator color={Colors.primary} />}
                animationDuration={300}
              />
              {renderResetIcon(onResetImageUrl, styles.resetIconOfImage)}
            </View>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingScrollView>
    </Layout>
  );
};
