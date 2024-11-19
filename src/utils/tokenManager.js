import axiosInstance from './axiosInstance';

let token = 'initial_token'; // 初始 token
let refreshTokenValue = 'initial_refresh_token'; // 初始 refresh token

export const getToken = () => token;

export const setToken = (newToken) => {
  token = newToken;
};

export const refreshToken = async () => {
  const response = await axiosInstance.post('/auth/refresh', { refreshToken: refreshTokenValue });
  const newToken = response.data.token;
  token = newToken;
  refreshTokenValue = response.data.refreshToken; // 更新 refresh token
  return newToken;
};
