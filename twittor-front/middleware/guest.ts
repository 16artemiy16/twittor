import { Context } from '@nuxt/types';

export default ({ app: { $authService }, redirect }: Context) => {
  const user = $authService.user();
  if (user) {
    redirect('/authed/home');
  }
}
