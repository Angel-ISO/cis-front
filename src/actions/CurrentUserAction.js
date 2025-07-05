import {jwtDecode} from "jwt-decode"
import UserRequest from "../services/UserHttpClient"

export const GetCurrentUserAct = async () => {
  try {
    const token = window.localStorage.getItem("token")
    if (!token) throw new Error("No token found")

    const decoded = jwtDecode(token)
    const userId = decoded?.userId || null

    if (!userId) throw new Error("User ID not found in token")

    const userData = await UserRequest.get(`/users/${userId}`)

    return { success: true, data: userData }
  } catch (error) {
    console.error("Error fetching current user:", error)
    return {
      success: false,
      message: error.response?.data?.message || "Unexpected error",
      error,
    }
  }
}


export const UpdateCurrentUserAct = async (dataToUpdate) => {
  try {
    const token = window.localStorage.getItem("token")
    if (!token) throw new Error("No token found")

    const decoded = jwtDecode(token)
    const userId = decoded?.userId || null
    if (!userId) throw new Error("User ID not found in token")

    const response = await UserRequest.put(`/users/${userId}/details`, dataToUpdate)
    return { success: true, data: response }
  } catch (error) {
    console.error("Error updating current user:", error)
    return {
      success: false,
      message: error.response?.data?.message || "Unexpected error",
      error,
    }
  }
}

export const DeleteCurrentUserAct = async () => {
  try {
    const token = window.localStorage.getItem("token")
    if (!token) throw new Error("No token found")

    const decoded = jwtDecode(token)
    const userId = decoded?.userId || null
    if (!userId) throw new Error("User ID not found in token")

    const response = await UserRequest.delete(`/users/delete-user/${userId}`)

    return { success: true, data: response }
  } catch (error) {
    console.error("Error deleting current user:", error)
    return {
      success: false,
      message: error?.response?.data?.message || "Unexpected error",
      error,
    }
  }
}

export const GetCurrentUserRole = () => {
  try {
    const token = window.localStorage.getItem("token")
    if (!token) throw new Error("No token found")

    const decoded = jwtDecode(token)
    const authorities = decoded?.authorities || []

    if (authorities.length === 0) throw new Error("No roles found in token")

    return authorities.substring(5)
  } catch (error) {
    console.error("Error getting user role:", error)
    return null
  }
}
