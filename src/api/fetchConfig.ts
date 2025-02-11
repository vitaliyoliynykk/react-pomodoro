import { DEFAULT_SEQUENCE_CONFIG_SHORT } from '../constants/sequence-config';
import { Sequence } from '../models/sequence';

export const fetchSequenceConfig = async (): Promise<Sequence> => {
  const sequenceConfig = await Promise.resolve(
    localStorage.getItem('sequenceConfig')
  );

  if (sequenceConfig) {
    return JSON.stringify(sequenceConfig) as unknown as Sequence;
  }

  return DEFAULT_SEQUENCE_CONFIG_SHORT;
};
