import {
  Button,
  Field,
  Heading,
  Input,
  NativeSelectField,
  NativeSelectRoot,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { SequenceItem, SequenceType } from '@/shared/models';
import { getConfig } from '@/store/slices/pomodoro-slice';
import { AppDispatch, RootState } from '@/store/store';

import { Buttons, Container, FormItem } from './styled-components';
import { getSettings } from '@/store/slices/settings-slice';

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

function SettingsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { pomodoroConfiguratin } = useSelector(
    (state: RootState) => state.settings.settings
  );
  const status = useSelector((state: RootState) => state.settings.status);

  const { register, handleSubmit, control, reset } = useForm<{
    items: Nullable<SequenceItem>[];
  }>({
    defaultValues: { items: [] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  useEffect(() => {
    void dispatch(getSettings());
  }, [dispatch]);

  useEffect(() => {
    reset({
      items: pomodoroConfiguratin.map(({ duration, type }) => ({
        duration: duration / 60,
        type,
      })),
    });
  }, [pomodoroConfiguratin, reset]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const getFields = () =>
    fields.map((field, index) => (
      <FormItem key={field.id}>
        <Field.Root>
          <Field.Label>Duration (minutes)</Field.Label>
          <Input
            type="number"
            // eslint-disable-next-line
            {...register(`items.${index}.duration`, {
              required: 'Duration is required',
            })}
          />
        </Field.Root>

        <NativeSelectRoot>
          <NativeSelectField
            placeholder="Select type"
            // eslint-disable-next-line
            {...register(`items.${index}.type`, {
              required: 'Duration is required',
            })}
          >
            <option value={SequenceType.POMODORO}>Pomodoro</option>
            <option value={SequenceType.SHORT_BREAK}>Short break</option>
            <option value={SequenceType.LONG_BREAK}>Long break</option>
          </NativeSelectField>
        </NativeSelectRoot>

        <Button
          variant="subtle"
          onClick={() => {
            remove(index);
          }}
        >
          X
        </Button>
      </FormItem>
    ));

  if (status == 'loading') {
    return <Spinner />;
  }

  return (
    <Container>
      <Heading>Timer</Heading>
      <Stack gap="4" align="flex-start" maxW="sm">
        {getFields()}

        <Buttons>
          <Button
            variant="subtle"
            colorPalette={'teal'}
            onClick={() => {
              append({ duration: null, type: null });
            }}
          >
            Add Input
          </Button>
          <Button
            colorPalette={'teal'}
            onClick={() => {
              void onSubmit();
            }}
          >
            Save
          </Button>
        </Buttons>
      </Stack>
    </Container>
  );
}

export default SettingsPage;
