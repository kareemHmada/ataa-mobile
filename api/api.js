import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


// export const BASE_URL = "http://10.0.2.2:8000/api";

const api = axios.create({
  // baseURL: "http://10.0.2.2:8000", //   emulator
  baseURL: "http:/192.168.1.4:8000", //   expo go
  //  http://192.168.xx.xx:8000  لو على موبايل
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
