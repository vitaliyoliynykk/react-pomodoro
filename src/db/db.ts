import { IDBPDatabase, openDB } from 'idb';

import { CONFIG_STORE_NAME, PomodoroDBModel } from '../models';

const DB_NAME = 'PomodoroDB';

export const initDB = async (): Promise<IDBPDatabase<PomodoroDBModel>> => {
  return openDB<PomodoroDBModel>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(CONFIG_STORE_NAME)) {
        db.createObjectStore(CONFIG_STORE_NAME, { keyPath: 'name' });
      }
    },
  });
};
