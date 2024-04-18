import axios from "axios";

function useAxios() {
  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL,
  });

  return axiosInstance;
}

export default useAxios;
