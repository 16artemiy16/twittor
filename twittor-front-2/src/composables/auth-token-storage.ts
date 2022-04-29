interface UseAuthTokenStorageResultI {
  /** Returns token from local storage **/
  get: () => string | null;
  /** True token is in local storage **/
  has: () => boolean;
  /** Removed token from local storage **/
  remove: () => void;
  /** Sets token to local storage **/
  set: (token: string) => void;
}


/**
 *  Composable for handling the auth token in local storage.
 */
const useAuthTokenStorage = (): UseAuthTokenStorageResultI => {
  const LS_KEY = 'token';

  return {
    get: () => localStorage.getItem(LS_KEY),
    has: () => !!localStorage.getItem(LS_KEY),
    remove: () => localStorage.removeItem(LS_KEY),
    set: (token: string) => localStorage.setItem(LS_KEY, token),
  };
};

export default useAuthTokenStorage;
