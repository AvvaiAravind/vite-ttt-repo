import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach auth token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // or from a store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: handle global errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized globally, e.g., redirect to login
      console.warn("Unauthorized! Redirecting to login...");
    }
    // Optionally handle other status codes here
    return Promise.reject(error);
  }
);

// Response interceptor: handle 401 logout & 403 refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (
    error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } }
  ) => {
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    // 401: Unauthorized → logout
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken"); // or from store
      // Optionally redirect to login page
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // 403: Forbidden → try refresh token once
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken"); // or from store
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, // need to change depending upon the backend route
          { token: refreshToken }
        );

        // Save new access token
        localStorage.setItem("authToken", data.accessToken); // or to store

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed → logout
        localStorage.removeItem("authToken"); // or from store
        localStorage.removeItem("refreshToken"); // or from store
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
