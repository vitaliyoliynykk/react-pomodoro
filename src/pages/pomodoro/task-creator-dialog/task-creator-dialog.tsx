import { Box, Button, Input, Portal, Text } from '@chakra-ui/react';
import { Dialog } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { toaster } from '@/components/ui/toaster';
import { addTask } from '@/store/slices/tasks-slice';
import { AppDispatch } from '@/store/store';

export const TaskCreatorDialog = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      sessions_goal: null,
      end_date: '',
    },
  });

  const today = new Date().toISOString().split('T')[0];

  const onSubmit = handleSubmit(({ title, sessions_goal, end_date }) => {
    dispatch(addTask({ title, sessions_goal, end_date, status: 'new' }))
      .unwrap()
      .then(() => {
        toaster.create({
          type: 'success',
          description: 'Task added',
          duration: 3000,
        });
      })
      .catch(() => {
        reset();
      })
      .finally(() => {
        setIsOpen(false);
        reset();
      });
  });

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => {
        setIsOpen(details.open);
      }}
    >
      <Dialog.Trigger asChild>
        <Button
          style={{ fontSize: 16 }}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add Task
        </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={6} borderRadius="md">
            <Dialog.Header>Add a new task</Dialog.Header>

            <Box
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div>
                <Input
                  placeholder="Task Title"
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && (
                  <Text color="red.500" fontSize="sm">
                    {errors.title.message}
                  </Text>
                )}
              </div>

              <div>
                <Input
                  type="number"
                  placeholder="Sessions Goal"
                  {...register('sessions_goal', {
                    required: 'Sessions goal is required',
                    valueAsNumber: true,
                    min: { value: 0, message: 'Must be at least 0' },
                  })}
                />
                {errors.sessions_goal && (
                  <Text color="red.500" fontSize="sm">
                    {errors.sessions_goal.message}
                  </Text>
                )}
              </div>

              <div>
                <Input
                  type="date"
                  min={today}
                  {...register('end_date', {
                    required: 'End date is required',
                    validate: (value) =>
                      value >= today || 'End date cannot be in the past',
                  })}
                />
                {errors.end_date && (
                  <Text color="red.500" fontSize="sm">
                    {errors.end_date.message}
                  </Text>
                )}
              </div>

              <Dialog.Footer display="flex" justifyContent="flex-end" gap="4">
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>

                <Button
                  type="submit"
                  colorScheme="blue"
                  onClick={() => {
                    void onSubmit();
                  }}
                >
                  Create
                </Button>
              </Dialog.Footer>
            </Box>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
