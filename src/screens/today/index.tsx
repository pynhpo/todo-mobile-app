import React, {useEffect, useMemo, useCallback} from 'react';
import {TouchableOpacity} from 'react-native-ui-lib';
import {SectionList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {Layout} from '@components/layout.component';
import {BluePlusSvg} from '@components/svg/blue-plus-svg';
import {NavigationService} from '@services/navigation.service';
import {SCREEN_NAME} from '@constants/navigation.constant';
import {fetchTodayTodoAction} from '@redux/todo/today/actions';
import {selectTodayTodo} from '@redux/todo/selectors';
import {TodoItemResponse} from '@type/api';
import {TodoItem} from '@components/todo-item.component';

export const TodayScreen = (): React.ReactElement => {
  const todayTodo = useSelector(selectTodayTodo);
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    dispatch(fetchTodayTodoAction());
  }, [dispatch]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

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
  return (
    <Layout style={styles.root}>
      <SectionList
        sections={data}
        keyExtractor={item => item?.uid}
        renderItem={({item}) => <TodoItem item={item} />}
        refreshControl={
          <RefreshControl
            refreshing={todayTodo.isFetching}
            onRefresh={onRefresh}
          />
        }
      />
      <TouchableOpacity
        style={styles.bluePlusIconCover}
        onPress={() => {
          NavigationService.navigate(SCREEN_NAME.details, {isToday: true});
        }}>
        <BluePlusSvg width={48} height={48} />
      </TouchableOpacity>
    </Layout>
  );
};
