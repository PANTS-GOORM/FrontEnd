import axios from "axios";

function useApiAxios() {
  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL,
  });

  return axiosInstance;
}

export default useApiAxios;
