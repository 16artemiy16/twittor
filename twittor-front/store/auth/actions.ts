import { ActionContext } from 'vuex';
import jwtDecode from 'jwt-decode';
import { AuthStateI } from '~/store/auth/state';
import { AuthMutation } from '~/store/auth/mutations';
import { UpdateUserDto } from '~/dtos/update-user.dto';

type AuthActionContext = ActionContext<AuthStateI, any>;

export enum AuthAction {
  LogIn = 'logIn',
  LogOut = 'logOut',
  UpdateProfile = 'updateProfile',
}

const COOKIE_KEY_TOKEN = 'token';

export default {
  async [AuthAction.LogIn](
    { commit }: AuthActionContext,
    { login, password }: { login: string, password: string }
  ) {
    try {
      const token = await this.$authService.logIn(login, password);
      this.$cookies.set(COOKIE_KEY_TOKEN, token);

      const jwtUser = jwtDecode(token);
      commit(AuthMutation.SetUser, jwtUser);
      return { success: true }
    } catch (err) {
      return { success: false, msg: err.response.data.message }
    }

  },
  [AuthAction.LogOut]() {
    this.$cookies.remove(COOKIE_KEY_TOKEN);
  },
  async [AuthAction.UpdateProfile]({ commit }: AuthActionContext, dto: UpdateUserDto) {
    commit(AuthMutation.SetIsProfileUpdating, true);
    const { token } = await this.$authService.updateUser(dto);
    this.$cookies.set(COOKIE_KEY_TOKEN, token);

    const jwtUser = jwtDecode(token);
    commit(AuthMutation.SetUser, jwtUser);
    commit(AuthMutation.SetIsProfileUpdating, false);
    return { success: true };
  }
} as any
