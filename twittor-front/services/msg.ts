import { Inject } from '@nuxt/types/app';
import { Vue } from 'vue-property-decorator';
import { DialogI } from '~/interfaces/dialog.interface';

const MOCKED_DIALOGS: DialogI[] = [
  {
    id: 1,
    isGroup: false,
    users: [{
      id: 1,
      login: 'test',
      img: null,
      fullname: 'Mr. Green',
      stats: {
        tweets: 1,
        followingCount: 2,
        followersCount: 5,
      },
      isVerified: false,
      headerImg: null,
      about: 'Just the green mister',
    }],
  },
  {
    id: 2,
    isGroup: false,
    users: [{
      id: 2,
      login: 'lich',
      img: null,
      fullname: 'Lich Skeleton',
      stats: {
        tweets: 1,
        followingCount: 2,
        followersCount: 5,
      },
      isVerified: false,
      headerImg: null,
      about: 'Hello! My name is Lich!!',
    }],
  }
]

export interface MsgServiceI {
  getMyDialogs: () => Promise<DialogI[]>;
}

export default ({ $axios }: Vue, inject: Inject) => {
  const msgService: MsgServiceI = {
    getMyDialogs: async () => {
      return MOCKED_DIALOGS;
    },
  };

  inject('msgService', msgService);
}
