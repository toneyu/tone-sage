import axios from 'axios';
import { DeviceProfile } from '../@types/models';

export const BASE_URL = 'https://stgrs1508.dir.svc.accenture.com/biampsagevue';

export const postLogin = (username: string, password: string) =>
  axios.post<{
    LoginId: string;
    Role: string;
  }>(`${BASE_URL}/api/login`, {
    credentials: {
      username,
      password,
    },
  });

export const getDeviceProfileAuth = () => (sessionId: string) =>
  axios.get<{
    DeviceProfile: DeviceProfile[];
  }>(`${BASE_URL}/api/DeviceProfile`, {
    headers: {
      sessionId,
    },
  });
