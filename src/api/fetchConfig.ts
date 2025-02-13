import { getPomodoroConfig } from '@/db/config-store';

import { DEFAULT_SEQUENCE_CONFIG } from '../constants/sequence-config';
import { Sequence } from '../models/sequence-model';

export const fetchSequenceConfig = async (
  configName: string
): Promise<Sequence> => {
  try {
    const sequenceConfig = await getPomodoroConfig(configName);

    if (sequenceConfig !== null) {
      return sequenceConfig;
    }

    return DEFAULT_SEQUENCE_CONFIG;
  } catch (e) {
    console.error('Error fetching sequence config', e);

    return DEFAULT_SEQUENCE_CONFIG;
  }
};
