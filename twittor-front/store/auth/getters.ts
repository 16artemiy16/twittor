import { AuthStateI } from '~/store/auth/state';

export default {
  isLoggedIn: (state: AuthStateI) => !!state.user,
}
