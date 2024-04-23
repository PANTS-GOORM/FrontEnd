import axios from "axios";

function useRankAxios() {
  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_RANK_URL,
  });

  return axiosInstance;
}

export default useRankAxios;
