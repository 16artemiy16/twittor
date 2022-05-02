import useAuthApi from '@/composables/api/auth.api';
import { URL_AUTH_SIGN_IN } from '@/constants/api/backend';
import { SignInWrongCredentialsError } from '@/errors/auth.api';

const MOCKED_TOKEN = 'my_token';
const MOCKED_LOGIN = 'user1';
const MOCKED_PASS = 'user1';

window.fetch = jest.fn().mockImplementation((url, { body }) =>  new Promise((resolve) => {
  const { login, password } = JSON.parse(body);
  if (login === MOCKED_LOGIN && password === MOCKED_PASS) {
    return resolve({
      json: () => Promise.resolve({token: MOCKED_TOKEN}),
      ok: true,
    });
  }
  return resolve({
    status: 401,
    ok: false,
  });
}));

describe('useAuthApi() composable', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  describe('signIn()', () => {
    it('uses fetch to send a correct response (URL and body)', async () => {
      await useAuthApi().signIn(MOCKED_LOGIN, MOCKED_PASS);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(URL_AUTH_SIGN_IN, {
        method: 'POST',
        body: JSON.stringify({ login: MOCKED_LOGIN, password: MOCKED_PASS }),
        headers: { 'Content-Type': 'application/json' },
      });
    });
    it('returns token if credentials are correct', async () => {
      const res = await useAuthApi().signIn(MOCKED_LOGIN, MOCKED_PASS);
      expect(res.token).toEqual(MOCKED_TOKEN);
    });
    it('throws error if credentials are incorrect', async () => {
      const req = useAuthApi().signIn('wrong', 'wrong_too');
      await expect(req).rejects.toBeInstanceOf(SignInWrongCredentialsError);
    });
  });
});
