const LS_KEY_TOKEN = 'token';

interface LogInI {
  success: boolean;
  msg?: string;
}

export default ({ $axios }: any, inject: any) => {
  inject(
    'authService',
    {
      logIn: async (login: string, password: string): Promise<LogInI> => {
        try {
          const { data } = await $axios.post('/sign-in', { login, password });
          localStorage.setItem(LS_KEY_TOKEN, data.token);
          return { success: true }
        } catch (err) {
          return { success: false, msg: err.response.data.message };
        }
      }
    }
  )
}
