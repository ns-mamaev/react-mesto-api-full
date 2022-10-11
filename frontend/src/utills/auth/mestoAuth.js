const BASE_URL = 'https://api.mesto.nsmamaev.nomoredomains.icu';

const register = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  if (res.ok) {
    return await res.json();
  }
  const err = await res.json();
  return Promise.reject(err);
};

const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  if (res.ok) {
    return await res.json();
  }
  const err = await res.json();
  return Promise.reject(err);
};

const logout = async () => {
  const res = await fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    credentials: 'include',
  });
  if (res.ok) {
    return await res.json();
  }
  const err = await res.json();
  return Promise.reject(err);
};

const getContent = async () => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
  });
  if (res.ok) {
    return await res.json();
  }
  const err = await res.json();
  return Promise.reject(err);
};

export { register, login, logout, getContent };
