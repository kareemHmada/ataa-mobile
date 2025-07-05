import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  // baseURL: "http://10.0.2.2:8000/api", //   emulator
  baseURL: "http://192.168.1.1:8000/api", //   expo go
  //  http://192.168.xx.xx:8000/api  لو على موبايل
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
