export interface FollowUserProps {
  id: string;
  name: string;
  avatar: string;
  image: string;
  title: string;
}

export interface UserProps {
  id: string;
  name: string;
  avatar: string;
  title: string;
  organization: string;
  location: string;
  image: string;
  _count: {
    createdThemes: number;
    likedThemes: number;
    savedThemes: number;
    following: number;
    followers: number;
  };
}
