export const setToken = (token: string) => {
  localStorage.setItem('adminToken', token);
};

export const getToken = () => {
  return localStorage.getItem('adminToken');
};
