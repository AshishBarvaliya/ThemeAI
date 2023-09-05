import axios from "axios";

export const getUser = async (id: string) => {
  const apiUrl = `/api/user?id=${id}`;

  try {
    const response = await axios.get(apiUrl);

    console.log(response);
  } catch (error) {
    console.log("Failed to fetch user");
  }
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
