import React, {useEffect, useMemo} from 'react';
import {KeyboardAvoidingScrollView} from '@components/keyboard-avoiding-scroll-view.component';
import {
  Text,
  Incubator,
  TouchableOpacity,
  ListItem,
  Colors,
  Checkbox,
} from 'react-native-ui-lib';
import {SectionList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {Layout} from '@components/layout.component';
import {GreenPlusSvg} from '@components/svg/green-plus-svg';
import {NavigationService} from '@services/navigation.service';
import {SCREEN_NAME} from '@constants/navigation.constant';
import {fetchTodayTodoAction} from '@redux/todo/today/actions';
import {
  markTodoItemAsCompletedAction,
  deleteTodoItemAction,
} from '@redux/todo/item/actions';
import {selectTodayTodo} from '@redux/todo/selectors';
import {TodoItemResponse} from '@type/api';
import SwipeableAction from '@components/swipeable-actions.component';

export const TodayScreen = (): React.ReactElement => {
  const todayTodo = useSelector(selectTodayTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodayTodoAction());
  }, [dispatch]);

  const data = useMemo<
    Array<{
      title: string;
      data: TodoItemResponse[];
    }>
  >(() => {
    return Object.keys(todayTodo.data.list).map(key => ({
      title: new Date(Number(key)).toLocaleDateString(),
      data: todayTodo.data.list[key],
    }));
  }, [todayTodo]);
  const updateItem = (item: TodoItemResponse) => {
    NavigationService.navigate(SCREEN_NAME.details, item);
  };
  return (
    <Layout style={styles.root}>
      <KeyboardAvoidingScrollView>
        <SectionList
          contentContainerStyle={{flex: 1}}
          sections={data}
          keyExtractor={item => item?.uid}
          renderItem={({item}) => (
            <SwipeableAction
              onEdit={() => {
                updateItem(item);
              }}
              onDelete={() => {
                dispatch(deleteTodoItemAction({uid: item?.uid}));
              }}>
              <ListItem
                activeBackgroundColor={Colors.grey60}
                activeOpacity={0.3}
                height={77.5}
                onPress={() => {
                  updateItem(item);
                }}>
                <ListItem.Part left>
                  {/* <Image source={{uri: row.mediaUrl}} style={styles.image} /> */}
                  <Checkbox
                    value={item.completed}
                    onValueChange={() => {
                      dispatch(
                        markTodoItemAsCompletedAction({
                          uid: item?.uid,
                          completed: !item.completed,
                        }),
                      );
                    }}
                  />
                </ListItem.Part>
                <ListItem.Part
                  middle
                  column
                  containerStyle={[styles.border, {paddingRight: 17}]}>
                  <ListItem.Part containerStyle={{marginBottom: 3}}>
                    <Text
                      grey10
                      text70
                      style={{flex: 1, marginRight: 10}}
                      numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text grey10 text70 style={{marginTop: 2}}>
                      {item.content}
                    </Text>
                  </ListItem.Part>
                  {/* <ListItem.Part>
                  <Text
                    style={{flex: 1, marginRight: 10}}
                    text90
                    grey40
                    numberOfLines={1}>{`${row.inventory.quantity} item`}</Text>
                  <Text text90 color={statusColor} numberOfLines={1}>
                    {row.inventory.status}
                  </Text>
                </ListItem.Part> */}
                </ListItem.Part>
              </ListItem>
            </SwipeableAction>
          )}
          renderSectionHeader={({section: {title}}) => <Text></Text>}
        />
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
