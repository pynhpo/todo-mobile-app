import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {
  Text,
  View,
  Incubator,
  TouchableOpacity,
  Colors,
} from 'react-native-ui-lib';
import {SectionList, RefreshControl} from 'react-native';
import debounce from 'lodash/debounce';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {Layout} from '@components/layout.component';
import {SearchSvg} from '@components/svg/search-svg';
import {FilterSvg} from '@components/svg/filter-svg';
import {BluePlusSvg} from '@components/svg/blue-plus-svg';
import {NavigationService} from '@services/navigation.service';
import {SCREEN_NAME} from '@constants/navigation.constant';
import {fetchAllTodoAction} from '@redux/todo/all/actions';
import {setTitleOfTodoFilterState} from '@redux/todo/filter/slice';
import {initialTodoFilterState} from '@redux/todo/filter/constants';
import {selectAllTodo, selectTodoFilter} from '@redux/todo/selectors';
import {TodoItemResponse} from '@type/api';
import {TodoItem} from '@components/todo-item.component';

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

  const onRefresh = useCallback(() => {
    dispatch(fetchAllTodoAction());
  }, [dispatch]);

  useEffect(() => {
    onRefresh();
  }, [filter, onRefresh]);

  const isFiltering = useMemo(() => {
    if (
      filter.sortByName === initialTodoFilterState.sortByName &&
      filter.sortByOrder === initialTodoFilterState.sortByOrder &&
      !filter.status
    ) {
      return false;
    }
    return true;
  }, [filter]);

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

  return (
    <Layout style={styles.root}>
      <View row center marginB-16>
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
        <TouchableOpacity onPress={showFilter} style={styles.filterIconCover}>
          <FilterSvg
            width={18}
            height={18}
            fill={Colors.gray}
            style={styles.filterIcon}
          />
          {isFiltering ? (
            <View
              absR
              width={7}
              height={7}
              br20
              backgroundColor={Colors.red30}
            />
          ) : null}
        </TouchableOpacity>
      </View>
      <SectionList
        sections={data}
        keyExtractor={item => item?.uid}
        renderItem={({item}) => <TodoItem item={item} />}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.sectionHeader} center>
            <Text text90 grey50>
              {title}
            </Text>
          </View>
        )}
        SectionSeparatorComponent={() => <View marginB-16 />}
        refreshControl={
          <RefreshControl
            refreshing={allTodo.isFetching}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={styles.bluePlusIconCover}
        onPress={() => {
          NavigationService.navigate(SCREEN_NAME.details);
        }}>
        <BluePlusSvg width={48} height={48} />
      </TouchableOpacity>
      <Filter isVisible={isFilterVisible} onHide={hideFilter} />
    </Layout>
  );
};
