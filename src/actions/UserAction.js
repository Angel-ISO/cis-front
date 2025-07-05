import HttpClient from "../services/HttpClient"


export const UserRegisterAct = async (user) => {
  try {
    const response = await HttpClient.post("/Auth/signup", user)
    return { success: true, data: response }
  } catch (error) {
    console.error("Error registering user:", error)
    return {
      success: false,
      message: error.response?.data?.message || "Unexpected error",
      error
    }
  }
}

export const UserLoginAct = async (user) => {
  try {
    const response = await HttpClient.post("/Auth/login", user)
    return { success: true, data: response } 
  } catch (error) {
    console.error("Error logging in user:", error.response?.data || error.message)
    return {
      success: false,
      message: error.response?.data?.message || "Unexpected error",
      error
    }
  }
}


