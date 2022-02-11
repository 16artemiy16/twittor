import { AuthStateI } from '~/store/auth/state';
import { UserJWTI } from '~/interfaces/user-jwt.interface';

export enum AuthMutation {
  SetUser = 'setUser',
}

export default {
  [AuthMutation.SetUser]: (state: AuthStateI, user: UserJWTI | null) => {
    state.user = user;
  },
}
