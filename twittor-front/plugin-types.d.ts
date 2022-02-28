import { AuthServiceI } from '~/services/auth';
import { TweetsServiceI } from '~/services/tweets';
import { UsersServiceI } from '~/services/users';
import { MsgServiceI } from '~/services/msg';

declare module 'vue/types/vue' {
  interface Vue {
    $authService: AuthServiceI;
    $tweetsService: TweetsServiceI;
    $usersService: UsersServiceI;
    $msgService: MsgServiceI;
  }
}
