export const get = (key) => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
}

export const set = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}
