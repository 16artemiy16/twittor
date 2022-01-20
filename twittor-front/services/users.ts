import Vue from 'vue';
import { Inject } from '@nuxt/types/app';
import { UserProfileI } from '~/interfaces/user-profile.interface';

export interface UsersServiceI {
  getUserProfile: (login: string) => Promise<UserProfileI>,
}

export default ({ $axios }: Vue, inject: Inject) => {
  const usersService: UsersServiceI = {
    getUserProfile: async (login) => {
      const { data } = await $axios.get(`/profile/${login}`);
      const { profile } = data;
      return {
        ...profile,
        img: 'https://www.pravmir.ru/wp-content/uploads/2011/02/pushkin.jpg',
        isVerified: true,
        headerImg: null,
        about: 'This is the section about me!',
        stats: {
          ...profile.stats,
          followingCount: 10,
          followersCount: 15,
        }
      }
    }
  }
  inject('usersService', usersService);
}
