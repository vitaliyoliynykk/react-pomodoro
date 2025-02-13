import { DBSchema } from 'idb';

import { SequenceDBEntryModel } from './sequence-db-entry-model';

export const CONFIG_STORE_NAME = 'config';

export interface PomodoroDBModel extends DBSchema {
  [CONFIG_STORE_NAME]: {
    key: string;
    value: SequenceDBEntryModel;
  };
}
