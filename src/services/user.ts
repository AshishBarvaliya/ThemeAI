import { INotification } from "@/interfaces/notification";
import { FollowUserProps, UserProps } from "@/interfaces/user";
import axios from "axios";

export const getUser = async (id: string) => {
  if (!id) return;
  const apiUrl = `/api/user?id=${id}`;
  const response = await axios.get(apiUrl);

  return response.data as UserProps;
};

export const followUser = async (userId?: string) => {
  if (!userId) return;
  const apiUrl = `/api/user/follow`;
  const response = await axios.post(apiUrl, {
    userId,
  });

  return response.data;
};

export const unfollowUser = async (userId?: string) => {
  if (!userId) return;
  const apiUrl = `/api/user/unfollow`;
  const response = await axios.post(apiUrl, {
    userId,
  });

  return response.data;
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
  const response = await axios.get(apiUrl);

  return response.data as INotification[];
};

export const markNotificationAsRead = async () => {
  const apiUrl = `/api/notifications`;
  const response = await axios.post(apiUrl);

  return response.data;
};

export const getHasNewNotifications = async () => {
  const apiUrl = `/api/notifications?new=1`;
  const response = await axios.get(apiUrl);

  return response.data;
};

export const getAllFollowings = async (userId: string) => {
  if (!userId) return;
  const apiUrl = `/api/user?id=${userId}&type=following`;
  const response = await axios.get(apiUrl);

  return response.data.followings?.map(
    (e: any) => e.following
  ) as FollowUserProps[];
};

export const getAllFollowers = async (userId: string) => {
  if (!userId) return;
  const apiUrl = `/api/user?id=${userId}&type=followers`;
  const response = await axios.get(apiUrl);

  return response.data.followers?.map(
    (e: any) => e.follower
  ) as FollowUserProps[];
};

export const getUserStats = async (userId: string) => {
  if (!userId) return;
  const apiUrl = `/api/user?id=${userId}&type=stats`;
  const response = await axios.get(apiUrl);

  return response.data;
};

interface PurchaseHistory {
  id: string;
  createdAt: string;
  pupa: number;
}

export const getPurchaseHistory = async () => {
  const apiUrl = `/api/purchase-history`;
  const response = await axios.get(apiUrl);

  return response.data as PurchaseHistory[];
};
