import { URL_AUTH_SIGN_IN } from '@/constants/api/backend';
import { SignInWrongCredentialsError } from '@/errors/auth.api';

interface UseAuthApi {
  signIn: (login: string, password: string) => Promise<{token: string}>;
}

/** Provides functions to handle authentication via API. **/
const useAuthApi = (): UseAuthApi => {
  return {
    signIn: (login, password) => {
      return fetch(
        URL_AUTH_SIGN_IN, {
          method: 'POST',
          body: JSON.stringify({ login, password }),
        })
        .then((res) => {
          if (!res.ok) {
            throw new SignInWrongCredentialsError();
          }
          return res.json();
        });
    }
  }
};

export default useAuthApi;
