import axios from 'axios';
import { DeviceProfile, Devices } from '../@types/models';

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

export const putRebootAuth = (serialNumber: string) => (
  sessionId: string,
  _: string,
  password: string,
) =>
  axios.put<{
    Result: boolean;
    Error?: string;
  }>(
    `${BASE_URL}/api/Devices/${serialNumber}/Reboot`,
    {
      credentials: {
        password,
      },
    },
    {
      headers: {
        sessionId,
      },
    },
  );

export const getDevicesAuth = () => (sessionId: string) =>
  axios.get<Devices>(`${BASE_URL}/api/Devices`, {
    headers: {
      sessionId,
    },
  });
