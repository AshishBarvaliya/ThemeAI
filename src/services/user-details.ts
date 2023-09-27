import axios from "axios";

export const getUserFollowingStatus = async (isLoggedIn: boolean) => {
  if (!isLoggedIn) return [];

  const apiUrl = `/api/user-details?type=following`;
  const response = await axios.get(apiUrl);

  return response.data.followings?.map((e: any) => e.following.id) as string[];
};

export const getUserFollowersStatus = async (isLoggedIn: boolean) => {
  if (!isLoggedIn) return [];

  const apiUrl = `/api/user-details?type=followers`;
  const response = await axios.get(apiUrl);

  return response.data.followers?.map((e: any) => e.follower.id) as string[];
};

export const getUserLikedThemesStatus = async (isLoggedIn: boolean) => {
  if (!isLoggedIn) return [];

  const apiUrl = `/api/user-details?type=likedthemes`;
  const response = await axios.get(apiUrl);

  return response.data as string[];
};

export const getUserSavedThemesStatus = async (isLoggedIn: boolean) => {
  if (!isLoggedIn) return [];

  const apiUrl = `/api/user-details?type=savedthemes`;
  const response = await axios.get(apiUrl);

  return response.data as string[];
};
