import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV({
  id: 'hermes-storage',
})

// tanStack Query persister needs an AsyncStorage-compatible interface
// MMKV is sync but i wrap it to satisfy the interface
export const mmkvStorageAdapter = {
  getItem: (key: string) => {
    const value = storage.getString(key)
    return Promise.resolve(value ?? null)
  },
  setItem: (key: string, value: string) => {
    storage.set(key, value)
    return Promise.resolve()
  },
  removeItem: (key: string) => {
    storage.delete(key)
    return Promise.resolve()
  },
}