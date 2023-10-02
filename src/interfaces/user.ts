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
  createdThemes: { id: string }[];
  likedThemes: { themeId: string }[];
  savedThemes: { themeId: string }[];
  following: { followingId: string }[];
  followers: { followerId: string }[];
}
