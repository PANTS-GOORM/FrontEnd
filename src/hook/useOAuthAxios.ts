import axios from "axios";

function useOAuthAxios() {
  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_OAUTH_URL,
  });

  return axiosInstance;
}

export default useOAuthAxios;
