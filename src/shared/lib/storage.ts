const map = new Map<string, string>()

export const mmkvStorageAdapter = {
  getItem: (key: string) => Promise.resolve(map.get(key) ?? null),
  setItem: (key: string, value: string) => {
    map.set(key, value)
    return Promise.resolve()
  },
  removeItem: (key: string) => {
    map.delete(key)
    return Promise.resolve()
  },
}