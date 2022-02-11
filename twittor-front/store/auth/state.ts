import { UserJWTI } from '~/interfaces/user-jwt.interface';

export interface AuthStateI {
  user: UserJWTI | null,
}

export default () => ({
  user: null,
});
