import { createListCollection, Portal, Select } from '@chakra-ui/react';
import { useEffect } from 'react';

import { getTasks, selectTask } from '@/store/slices/tasks-slice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export const TaskSelector = () => {
  const dispatch = useAppDispatch();

  const { tasks, selectedTask } = useAppSelector(({ tasks }) => tasks);

  const tasksCollection = createListCollection({
    items: tasks.map(({ title, _id }) => ({ _id, label: title, value: _id })),
  });

  useEffect(() => {
    void dispatch(getTasks());
  }, [dispatch]);

  const selectedValue = selectedTask?._id ? [selectedTask._id] : undefined;

  return (
    <Select.Root
      collection={tasksCollection}
      variant="subtle"
      size="md"
      value={selectedValue}
      onValueChange={({ value: taskId }) => dispatch(selectTask(taskId[0]))}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select task" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {tasksCollection.items.map((task) => (
              <Select.Item item={task} key={task._id}>
                {task.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
