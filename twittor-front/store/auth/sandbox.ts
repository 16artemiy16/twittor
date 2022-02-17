import { createNamespacedHelpers } from 'vuex';
import { AuthAction } from '~/store/auth/actions';

const { mapState, mapActions } = createNamespacedHelpers('auth')

export const computed = {
  ...mapState([
    'user',
    'isProfileUpdating',
  ]),
} as Record<'user' | 'isProfileUpdating', any>;

export const actions = {
  ...mapActions([
    AuthAction.LogIn,
    AuthAction.LogOut,
    AuthAction.UpdateProfile,
  ]),
} as Record<AuthAction.LogIn | AuthAction.LogOut | AuthAction.UpdateProfile, Function>
