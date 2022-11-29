import React, {FC} from 'react';
import {Text, View, Button, Colors} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ArrowDownSvg} from '@components/svg/arrow-down-svg';
import {ArrowUpSvg} from '@components/svg/arrow-up-svg';
import {selectTodoFilter} from '@redux/todo/selectors';
import {setTodoFilterState} from '@redux/todo/filter/slice';
import {Status, SortByName} from '@type/api';
import {BottomHalfModal} from '@components/bottom-half-modal.component';

type FilterProps = {
  isVisible: boolean;
  onHide: () => void;
};

const STATUS: Status[] = ['active', 'completed', 'today', 'future', 'overdue'];
const SORT_BY: SortByName[] = ['appliedDate', 'completedDate', 'createdDate'];

export const Filter: FC<FilterProps> = ({
  isVisible,
  onHide,
}): React.ReactElement => {
  const dispatch = useDispatch();
  const filter = useSelector(selectTodoFilter);

  const onChangeStatus = (status: Status) => () => {
    dispatch(
      setTodoFilterState({
        ...filter,
        status: filter.status === status ? undefined : status,
      }),
    );
  };

  const onChangeSortBy = (name: SortByName) => () => {
    dispatch(
      setTodoFilterState({
        ...filter,
        sortByName: name,
        sortByOrder:
          filter.sortByName === name
            ? filter?.sortByOrder === 'desc'
              ? 'asc'
              : 'desc'
            : 'desc',
      }),
    );
  };

  return (
    <BottomHalfModal
      isVisible={isVisible}
      onBackButtonPress={onHide}
      onBackdropPress={onHide}>
      <View row>
        <Text marginR-8 marginT-6>
          Status:
        </Text>
        <View marginR style={styles.actionButtonsCover}>
          {STATUS.map(status => (
            <Button
              key={status}
              size="small"
              style={styles.button}
              backgroundColor={Colors.$backgroundSuccessHeavy}
              label={status}
              outline={filter.status !== status}
              onPress={onChangeStatus(status)}
              iconOnRight
            />
          ))}
        </View>
      </View>
      <View row marginT-8>
        <Text marginR-8 marginT-6>
          Sort by:
        </Text>
        <View marginR style={styles.actionButtonsCover}>
          {SORT_BY.map(name => (
            <Button
              key={name}
              size="small"
              style={styles.button}
              backgroundColor={Colors.$backgroundSuccessHeavy}
              iconSource={(props: any) =>
                filter.sortByName === name ? (
                  filter.sortByOrder === 'desc' ? (
                    <ArrowDownSvg width={18} height={18} {...props} />
                  ) : (
                    <ArrowUpSvg width={18} height={18} {...props} />
                  )
                ) : undefined
              }
              label={name}
              outline={filter.sortByName !== name}
              onPress={onChangeSortBy(name)}
              iconOnRight
            />
          ))}
        </View>
      </View>
    </BottomHalfModal>
  );
};

const styles = StyleSheet.create({
  actionButtonsCover: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  button: {
    marginBottom: 8,
    marginRight: 4,
  },
});
