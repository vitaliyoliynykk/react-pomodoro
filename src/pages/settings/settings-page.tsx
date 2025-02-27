import {
  Button,
  Field,
  Heading,
  Input,
  NativeSelectField,
  NativeSelectRoot,
  Stack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { SequenceItem } from '@/shared/models';
import { AppDispatch, RootState } from '@/store';

import { getConfig } from '../pomodoro/pomodoro-slice';
import { Buttons, Container, FormItem } from './styled-components';

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

function SettingsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const sequenceConfig = useSelector(
    (state: RootState) => state.pomodoro.config.data
  );

  const { register, handleSubmit, control, reset } = useForm<{
    items: Nullable<SequenceItem>[];
  }>({
    defaultValues: { items: [] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  useEffect(() => {
    void dispatch(getConfig());
  }, [dispatch]);

  useEffect(() => {
    reset({
      items: sequenceConfig.map(({ duration, type }) => ({
        duration: duration / 60,
        type,
      })),
    });
  }, [sequenceConfig, reset]);

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
            <option value="pomodoro">Pomodoro</option>
            <option value="short_break">Short break</option>
            <option value="long_break">Long break</option>
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
