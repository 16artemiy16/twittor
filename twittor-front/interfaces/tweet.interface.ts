export interface TweetI {
  id: string;
  body: string;
  created: number;
  user: {
    name: string;
    login: string;
    img: string;
  };
  likes: {
    total: number;
    isLikedByMe: boolean;
  };
}
