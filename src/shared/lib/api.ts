import axios from 'axios'

const NYT_API_KEY = process.env.EXPO_PUBLIC_NYT_API_KEY

export const nytApi = axios.create({
  baseURL: 'https://api.nytimes.com/svc',
  timeout: 10000,
})

nytApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    'api-key': NYT_API_KEY,
  }
  return config
})

nytApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      return Promise.reject(new Error('Rate limit reached. Please try again shortly.'))
    }
    if (error.response?.status === 401) {
      return Promise.reject(new Error('Invalid API key.'))
    }
    if (!error.response) {
      return Promise.reject(new Error('No internet connection.'))
    }
    return Promise.reject(error)
  }
)