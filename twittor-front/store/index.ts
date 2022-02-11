import jwtDecode from 'jwt-decode';
import { AuthMutation } from '~/store/auth/mutations';

const COOKIE_KEY_TOKEN = 'token';

export default {
  actions: {
    nuxtServerInit(context: any) {
      initAuthUser.call(this, context)
    },
  } as any
};

/** If there is a token in cookies, inits the user in Auth State **/
function initAuthUser(this: any, { commit }: any) {
  const COOKIE_KEY_TOKEN = 'token';
  try {
    const token = this.$cookies.get(COOKIE_KEY_TOKEN);
    const jwtUser = token && jwtDecode(token);
    commit(`auth/${AuthMutation.SetUser}`, jwtUser);
  } catch (err) {
    this.$cookies.remove(COOKIE_KEY_TOKEN);
  }
}
