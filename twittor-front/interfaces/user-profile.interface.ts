export interface UserProfileI {
  name: string;
  isVerified: boolean,
  totalTweets: number,
  headerImg: string | null,
  img: string | null,
  login: string,
  about: string,
  followingCount: number,
  followersCount: number,
}
