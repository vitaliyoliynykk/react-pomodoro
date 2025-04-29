import { Sequence } from '../sequence-model';

export interface SettingsResponseModel {
  pomodoroConfiguration: Sequence;
  pushNotificationsEnabled: boolean;
}
