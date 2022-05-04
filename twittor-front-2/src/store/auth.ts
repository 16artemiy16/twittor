import { defineStore } from 'pinia';
import useAuthApi from '@/composables/api/auth.api';
import parseJwt from '@/utils/parse-jwt';
import { AuthedUserI } from '@/interfaces/authed-user.interface';
import useAuthTokenStorage from '@/composables/storage/auth-token-storage';

export type AuthState = {
  /** Authed user data obtained from JWT token **/
  userInfo: AuthedUserI | null;
}

export type AuthGetters = {
  /** True if the user is authed (i.e. the valid JWT token is in the local storage) **/
  isAuthed: () => boolean;
}

export type AuthActions = {
  /** Init state on first application load. **/
  initOnLoad: (this: AuthStoreThis) => void;
  /** Sign In via API and set the token to local storage. **/
  signIn: (login: string, password: string) => Promise<void>;
}

export type AuthStoreThis = AuthState & AuthGetters & AuthActions;

export const useAuthStore = defineStore<'auth', AuthState, AuthGetters, AuthActions>('auth', {
  state: () => ({
    userInfo: null,
  } as AuthState),
  getters: {
    isAuthed(this: AuthStoreThis) {
      return !!this.userInfo;
    }
  },
  actions: {
    initOnLoad(this: AuthStoreThis) {
      const token =  useAuthTokenStorage().get();
      if (token) {
        this.userInfo = parseJwt(token);
      }
    },
    async signIn(this: AuthStoreThis, login, password) {
      const { signIn } = useAuthApi();
      const { token } = await signIn(login, password);
      this.userInfo = parseJwt<AuthedUserI>(token);
      useAuthTokenStorage().set(token);
    },
  }
});
