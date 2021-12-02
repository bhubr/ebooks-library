export interface User {
  id: number;
  githubId: number;
  login: string;
  avatarUrl: string;
}

export interface Book {
  id: number;
  title: string;
  slug: string;
  coverPicture: string;
}