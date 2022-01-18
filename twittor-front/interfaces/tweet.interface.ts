export interface TweetI {
  id: string;
  body: string;
  created: number;
  user: {
    id: number;
    fullname: string;
    login: string;
    img: string;
  };
  likes: {
    total: number;
    isLikedByMe: boolean;
  };
}
