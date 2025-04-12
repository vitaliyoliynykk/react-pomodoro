import { Sequence } from '../sequence-model';

export interface SettinsResponseModel {
  pomodoroConfiguration: Sequence;
  pushNotificationsEnabled: boolean;
}
