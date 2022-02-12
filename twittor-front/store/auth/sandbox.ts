import { createNamespacedHelpers } from 'vuex';
import { AuthAction } from '~/store/auth/actions';

const { mapState, mapActions } = createNamespacedHelpers('auth')

export const computed = {
  ...mapState([
    'user',
  ]),
} as Record<'user', any>;

export const actions = {
  ...mapActions([
    AuthAction.LogIn,
    AuthAction.LogOut,
  ]),
} as Record<AuthAction.LogIn | AuthAction.LogOut, Function>
