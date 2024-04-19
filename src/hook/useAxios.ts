import axios from "axios";

function useAxios() {
  const axiosInstance = axios.create({
    withCredentials: true,
    // baseURL: process.env.REACT_APP_API_URL, 고민할 필요가 있을듯
  });

  return axiosInstance;
}

export default useAxios;
