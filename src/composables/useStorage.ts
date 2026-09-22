export const useStorage = () => {
  const get = (key: string) => {
    const data = localStorage.getItem(key)

    return data ? JSON.parse(data) : []
  }
  const set = (key: string, data: unknown) => {
    localStorage.setItem(key, JSON.stringify(data))
  }

  return {
    get,
    set,
  }
}
