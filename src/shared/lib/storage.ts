import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV({ id: 'hermes-storage' })

export const mmkvStorageAdapter = {
  getItem: (key: string) => Promise.resolve(storage.getString(key) ?? null),
  setItem: (key: string, value: string) => {
    storage.set(key, value)
    return Promise.resolve()
  },
  removeItem: (key: string) => {
    storage.delete(key)
    return Promise.resolve()
  },
}