import useAuthTokenStorage from '@/composables/auth-token-storage';
import mockLocalStorage from '../../mocks/utils/mock-local-storage';

const LS_KEY_TOKEN = 'token';
const MOCKED_TOKEN = 'my_token';

describe.only('useAuthTokenStorage() composable', () => {
  beforeEach(() => {
    mockLocalStorage();
  });

  afterEach(() => localStorage.clear())

  describe('get()', () => {
    it('returns the token if it\'s set', () => {
      localStorage.setItem(LS_KEY_TOKEN, MOCKED_TOKEN);
      expect(useAuthTokenStorage().get()).toEqual(MOCKED_TOKEN);
    });

    it('returns null if the token isn\'t set', () => {
      expect(useAuthTokenStorage().get()).toEqual(null);
    });
  });

  describe('has()', () => {
    it('returns false if the token isn\'t set', () => {
      localStorage.setItem(LS_KEY_TOKEN, MOCKED_TOKEN);
      expect(useAuthTokenStorage().has()).toEqual(true);
    });
    it('returns true if the token isn\'t set', () => {
      expect(useAuthTokenStorage().has()).toEqual(false);
    });
  })

  it('set() sets the token', () => {
    useAuthTokenStorage().set(MOCKED_TOKEN);
    expect(localStorage.getItem(LS_KEY_TOKEN)).toEqual(MOCKED_TOKEN);
  });

  it('remove() should remove the token', () => {
    localStorage.setItem(LS_KEY_TOKEN, MOCKED_TOKEN);
    useAuthTokenStorage().remove()
    expect(localStorage.getItem(LS_KEY_TOKEN)).toEqual(null);
  });
});
