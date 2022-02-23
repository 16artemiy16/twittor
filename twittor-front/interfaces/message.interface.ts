import { UserProfileI } from '~/interfaces/user-profile.interface';

export interface MessageI {
  id: number;
  isGroup: false;
  users: UserProfileI[];
}
