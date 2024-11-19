import axiosInstance from './axiosInstance';

// 示例 API 方法
export const getUserData = () => {
  return axiosInstance.get('/user');
};

export const updateUser = (data) => {
  return axiosInstance.post('/user/update', data);
};
