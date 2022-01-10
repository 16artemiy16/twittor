import { AuthServiceI } from '~/services/auth';
import { TweetsServiceI } from '~/services/tweets';

declare module 'vue/types/vue' {
  interface Vue {
    $authService: AuthServiceI;
    $tweetsService: TweetsServiceI
  }
}
