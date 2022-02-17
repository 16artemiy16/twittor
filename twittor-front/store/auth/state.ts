import { UserJWTI } from '~/interfaces/user-jwt.interface';

export interface AuthStateI {
  user: UserJWTI | null,
  isProfileUpdating: boolean,
}

export default () => ({
  user: null,
  isProfileUpdating: false,
});
