import { AuthStateI } from '~/store/auth/state';
import { UserJWTI } from '~/interfaces/user-jwt.interface';

export enum AuthMutation {
  SetUser = 'setUser',
  SetIsProfileUpdating = 'setIsProfileUpdating',
}

export default {
  [AuthMutation.SetUser]: (state: AuthStateI, user: UserJWTI | null) => {
    state.user = user;
  },
  [AuthMutation.SetIsProfileUpdating]: (state: AuthStateI, flag: boolean) => {
    state.isProfileUpdating = flag;
  },
}
