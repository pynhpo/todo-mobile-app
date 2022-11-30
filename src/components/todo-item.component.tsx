import React, {useMemo, FC} from 'react';
import {StyleSheet} from 'react-native';
import {
  Text,
  ListItem,
  ListItemProps,
  Colors,
  Checkbox,
} from 'react-native-ui-lib';
import SwipeableAction from '@components/swipeable-actions.component';
import {NavigationService} from '@services/navigation.service';
import {SCREEN_NAME} from '@constants/navigation.constant';
import {TodoItemResponse} from '@type/api';
import {useDispatch} from 'react-redux';
import {
  markTodoItemAsCompletedAction,
  deleteTodoItemAction,
} from '@redux/todo/item/actions';

interface TodoItemProps extends ListItemProps {
  item: TodoItemResponse;
}

export const TodoItem: FC<TodoItemProps> = (props): React.ReactElement => {
  const dispatch = useDispatch();
  const {style, item, ...restProps} = props;
  const customStyle = useMemo(() => {
    return [styles.root, style];
  }, [style]);

  const updateItem = (data: TodoItemResponse) => {
    NavigationService.navigate(SCREEN_NAME.details, data);
  };

  const priorityText = useMemo(() => {
    switch (item?.priority) {
      case 'normal':
        return '';
      case 'medium':
        return '! ';
      case 'high':
        return '!! ';
      case 'highest':
        return '!!! ';
      default:
        return '';
    }
  }, [item?.priority]);

  return (
    <SwipeableAction
      onEdit={() => {
        updateItem(item);
      }}
      onDelete={() => {
        dispatch(deleteTodoItemAction({uid: item?.uid}));
      }}>
      <ListItem
        style={customStyle}
        activeBackgroundColor={Colors.grey60}
        activeOpacity={0.3}
        // height={77.5}
        onPress={() => {
          updateItem(item);
        }}
        {...restProps}>
        <ListItem.Part left marginR-8>
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
        <ListItem.Part middle column containerStyle={styles.item}>
          <ListItem.Part>
            <Text
              grey10
              flex-1
              numberOfLines={1}
              style={item?.completed ? styles.lineThroughText : undefined}>
              <Text red40>{priorityText}</Text>
              {item.title}
            </Text>
          </ListItem.Part>
          {item.content || item.dueAt ? (
            <ListItem.Part>
              <Text
                flex-1
                text90
                {...(item.dueAt ? {red50: true} : {grey40: true})}
                numberOfLines={1}>
                {item.dueAt
                  ? new Date(item.dueAt)?.toLocaleString?.()
                  : item.content}
              </Text>
            </ListItem.Part>
          ) : null}
        </ListItem.Part>
      </ListItem>
    </SwipeableAction>
  );
};

const styles = StyleSheet.create({
  root: {},
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey60,
  },
  lineThroughText: {
    textDecorationLine: 'line-through',
    color: Colors.grey30,
  },
});
