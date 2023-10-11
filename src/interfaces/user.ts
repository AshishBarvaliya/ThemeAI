export interface FollowUserProps {
  id: string;
  name: string;
  avatar: string;
  image: string;
  experience: number;
  title: string;
  level: number;
  createdThemes: number;
}

export interface UserProps {
  id: string;
  name: string;
  avatar: string;
  title: string;
  organization: string;
  location: string;
  experience: number;
  image: string;
  level: number;
  createdThemes: { id: string }[];
  likedThemes: { themeId: string }[];
  savedThemes: { themeId: string }[];
  following: { followingId: string }[];
  followers: { followerId: string }[];
}
