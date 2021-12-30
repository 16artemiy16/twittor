import { UserProfileI } from '~/interfaces/user-profile.interface';

const USER: UserProfileI = {
  name: 'John Snow',
  isVerified: true,
  totalTweets: 415,
  headerImg: null,
  img: 'https://www.pravmir.ru/wp-content/uploads/2011/02/pushkin.jpg',
  login: '@john.snow',
  about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  followingCount: 250,
  followersCount: 14,
};

const DELAY = 1000;

export const getUserProfile = (userId: string): Promise<UserProfileI> => {
  return new Promise<UserProfileI>((resolve) => {
    setTimeout(() => resolve(USER), DELAY);
  });
}
