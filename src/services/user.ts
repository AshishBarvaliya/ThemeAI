import { FollowUserProps } from "@/interfaces/user";
import axios from "axios";

interface UserProps {
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

export const getUser = async (id: string): Promise<UserProps> => {
  const apiUrl = `/api/user?id=${id}`;
  const response = await axios.get(apiUrl);

  return response.data as UserProps;
};

export const toggleFollowing = async (userId: string) => {
  const apiUrl = `/api/follow-user`;

  try {
    const response = await axios.post(apiUrl, {
      userId,
    });

    console.log(response);
  } catch (error) {
    console.log("Failed to toggle follow user");
  }
};

export const sendVerificationEmail = async () => {
  const apiUrl = `/api/send-verification-email`;

  try {
    const response = await axios.post(apiUrl);

    console.log(response);
  } catch (error) {
    console.log("Failed to send verification email");
  }
};

export const sendPasswordResetEmail = async (email: string) => {
  const apiUrl = `/api/reset-password`;

  return axios.post(apiUrl, {
    email,
  });
};

export const updatePassword = async (
  currentpassword: string,
  password: string,
  token?: string
) => {
  const apiUrl = token
    ? `/api/update-password?token=${token}`
    : `/api/update-password`;

  return axios.put(apiUrl, {
    currentpassword,
    password,
  });
};

export const getNotifications = async () => {
  const apiUrl = `/api/notifications`;

  return axios.get(apiUrl);
};

export const getAllFollowings = async () => {
  const apiUrl = `/api/user?type=following`;
  const response = await axios.get(apiUrl);

  return response.data.followings?.map(
    (e: any) => e.following
  ) as FollowUserProps[];
};

export const getAllFollowers = async () => {
  const apiUrl = `/api/user?type=followers`;
  const response = await axios.get(apiUrl);

  return response.data.followers?.map(
    (e: any) => e.follower
  ) as FollowUserProps[];
};

export const getUserLikedThemes = async () => {
  const apiUrl = `/api/user?type=likedthemes`;
  const response = await axios.get(apiUrl);

  return response.data as string[];
};
