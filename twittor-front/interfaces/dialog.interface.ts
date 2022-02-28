import { UserProfileI } from '~/interfaces/user-profile.interface';

export interface DialogI {
  id: number;
  isGroup: false;
  users: UserProfileI[];
}
