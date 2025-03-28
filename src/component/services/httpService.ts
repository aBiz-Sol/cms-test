// Import any necessary libraries
import axios, { AxiosResponse, AxiosRequestConfig } from "axios"

// Define methods for making HTTP requests
const httpService = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axios.get<T>(url, config)
      return response.data
    } catch (error) {
      // Handle errors
      console.error("Error making GET request:", error)
      throw error
    }
  },

  post: async <T>(
    url: string,
    data?: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axios.post<T>(url, data, config)
      return response.data
    } catch (error) {
      // Handle errors
      console.error("Error making POST request:", error)
      throw error
    }
  }

  // Add other HTTP request methods as needed: put, delete, etc.
}

export default httpService
