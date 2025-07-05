import axios from "axios"

const userAxios = axios.create({
  baseURL: "http://localhost:6969/api",
})

userAxios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

const UserRequest = {
  get: async (url) => {
    try {
      const response = await userAxios.get(url)
      return response.data
    } catch (error) {
      console.error("Error fetching user data:", error)
      throw error
    }
  },

  put: async (url, data) => {
    try {
      const response = await userAxios.put(url, data)
      return response.data
    } catch (error) {
      console.error("Error updating user:", error)
      throw error
    }
  },

  delete: async (url) => {
    try {
      const response = await userAxios.delete(url)
      return response.data
    } catch (error) {
      console.error("Error deleting user:", error)
      throw error
    }
  },
}

export default UserRequest