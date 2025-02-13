import { getPomodoroConfig } from '@/db/config-store';
import { DEFAULT_SEQUENCE_CONFIG } from '@/shared/constants/sequence-config';
import { Sequence } from '@/shared/models';

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
