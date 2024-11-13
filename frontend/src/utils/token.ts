import cookies from 'js-cookie';

export const getToken = () => {
  if (typeof window === 'undefined') return "";
  return cookies.get('token');
};

export const setToken = (token: string) => {
  if (typeof window === 'undefined') return;
  cookies.set('token', token, { expires: 7 });
};
