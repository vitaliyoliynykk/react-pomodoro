import { CONFIG_STORE_NAME, Sequence, SequenceDBEntryModel } from '@/models';

import { initDB } from './db';

export const getPomodoroConfig = async (
  configName: string
): Promise<Sequence | null> => {
  try {
    const db = await initDB();

    const response = await db.get(CONFIG_STORE_NAME, configName);

    if (response?.data) {
      return response.data;
    }

    return null;
  } catch (err) {
    console.error('Error fetching config from db', err);

    return null;
  }
};

export const setPomodoroConfig = async (
  value: SequenceDBEntryModel
): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(CONFIG_STORE_NAME, 'readwrite');
  const store = tx.objectStore(CONFIG_STORE_NAME);

  await store.put(value);
  await tx.done;
};
