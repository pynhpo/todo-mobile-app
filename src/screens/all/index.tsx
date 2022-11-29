import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {KeyboardAvoidingScrollView} from '@components/keyboard-avoiding-scroll-view.component';
import {
  Text,
  View,
  Incubator,
  TouchableOpacity,
  ListItem,
  Colors,
  Checkbox,
} from 'react-native-ui-lib';
import {SectionList} from 'react-native';
import debounce from 'lodash/debounce';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {Layout} from '@components/layout.component';
import {SearchSvg} from '@components/svg/search-svg';
import {FilterSvg} from '@components/svg/filter-svg';
import {GreenPlusSvg} from '@components/svg/green-plus-svg';
import {colors} from '@theme/colors';
import {NavigationService} from '@services/navigation.service';
import {SCREEN_NAME} from '@constants/navigation.constant';
import {fetchAllTodoAction} from '@redux/todo/all/actions';
import {
  markTodoItemAsCompletedAction,
  deleteTodoItemAction,
} from '@redux/todo/item/actions';
import {setTitleOfTodoFilterState} from '@redux/todo/filter/slice';
import {selectAllTodo, selectTodoFilter} from '@redux/todo/selectors';
import {TodoItemResponse} from '@type/api';
import SwipeableAction from '@components/swipeable-actions.component';

import {Filter} from './components/Filter';

const {TextField} = Incubator;

export const AllScreen = (): React.ReactElement => {
  const allTodo = useSelector(selectAllTodo);
  const filter = useSelector(selectTodoFilter);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);

  const showFilter = () => {
    setFilterVisible(true);
  };

  const hideFilter = () => {
    setFilterVisible(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearchByTitle = useCallback(
    debounce((text: string) => {
      dispatch(setTitleOfTodoFilterState({title: text}));
    }, 400),
    [],
  );

  const onChangeSearchText = (text: string) => {
    setSearchText(text);
    onSearchByTitle(text);
  };

  useEffect(() => {
    dispatch(fetchAllTodoAction());
  }, [dispatch, filter]);

  const data = useMemo<
    Array<{
      title: string;
      data: TodoItemResponse[];
    }>
  >(() => {
    return Object.keys(allTodo.data.list).map(key => ({
      title: new Date(Number(key)).toLocaleDateString(),
      data: allTodo.data.list[key],
    }));
  }, [allTodo]);
  const updateItem = (item: TodoItemResponse) => {
    NavigationService.navigate(SCREEN_NAME.details, item);
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
            onChangeText={onChangeSearchText}
            autoCapitalize="none"
            leadingAccessory={
              <SearchSvg width={18} height={18} style={styles.searchIcon} />
            }
            containerStyle={styles.searchInput}
          />
          <TouchableOpacity onPress={showFilter}>
            <FilterSvg
              width={18}
              height={18}
              fill={colors.gray}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>
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
          renderSectionHeader={({section: {title}}) => <Text>{title}</Text>}
        />
      </KeyboardAvoidingScrollView>
      <TouchableOpacity
        style={styles.greenPlusIconCover}
        onPress={() => {
          NavigationService.navigate(SCREEN_NAME.details);
        }}>
        <GreenPlusSvg width={48} height={48} />
      </TouchableOpacity>
      <Filter isVisible={isFilterVisible} onHide={hideFilter} />
    </Layout>
  );
};
