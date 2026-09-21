export const get = (key: string) => {
  const data = localStorage.getItem(key)

  return data ? JSON.parse(data) : []
}

export const set = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export default { get, set }
