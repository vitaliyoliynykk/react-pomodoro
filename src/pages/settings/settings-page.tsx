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

import { SequenceItem, SequenceType } from '@/shared/models';
import { getSettings, updateSettings } from '@/store/slices/settings-slice';
import { useAppDispatch, useAppSelector } from '@/store/store';

import { Buttons, Container, FormItem } from './styled-components';

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

function SettingsPage() {
  const dispatch = useAppDispatch();

  const { pomodoroConfiguratin, pushNotificationEnabled } = useAppSelector(
    ({ settings }) => settings.settings
  );
  const status = useAppSelector(({ settings }) => settings.status);

  const { register, handleSubmit, control, reset } = useForm<{
    items: Nullable<SequenceItem>[];
    pushNotificationEnabled: Nullable<boolean>;
  }>({
    defaultValues: { items: [], pushNotificationEnabled: true },
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
      pushNotificationEnabled,
    });
  }, [pomodoroConfiguratin, pushNotificationEnabled, reset]);

  const onSubmit = handleSubmit((data) => {
    const sequence = data.items.map<SequenceItem>((item) => ({
      type: item.type ?? SequenceType.POMODORO,
      duration: Number(item.duration) * 60,
    }));
    void dispatch(
      updateSettings({
        pomodoroConfiguration: sequence,
        pushNotificationsEnabled: data.pushNotificationEnabled,
      })
    );
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
            colorPalette={'teal'}
            onClick={() => {
              append({ duration: null, type: null });
            }}
          >
            Add Input
          </Button>
          <Button
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
