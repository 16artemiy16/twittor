export interface UserProfileI {
  id: number;
  login: string;
  img: string | null;
  fullname: string;
  stats: {
    tweets: number;
    // TODO: all the fields below are mocked for now
    followingCount: number,
    followersCount: number,
  };
  isVerified: boolean,
  headerImg: string | null,
  about: string,

}
