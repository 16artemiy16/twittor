export interface TweetI {
  id: string;
  body: string;
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
