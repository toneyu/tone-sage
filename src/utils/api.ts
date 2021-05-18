import axios, { AxiosResponse } from 'axios';
import { DeviceProfile, Devices } from 'types/models';

// export const BASE_URL = 'https://stgrs1508.dir.svc.accenture.com/biampsagevue';

export const postLogin = (username: string, password: string, url: string) =>
  axios.post<{
    LoginId: string;
    Role: string;
  }>(`${url}/api/login`, {
    credentials: {
      username,
      password,
    },
  });

export const getDeviceProfileAuth = () => (
  sessionId: string,
  _username: string,
  _password: string,
  url: string,
) =>
  axios.get<{
    DeviceProfile: DeviceProfile[];
  }>(`${url}/api/DeviceProfile`, {
    headers: {
      sessionId,
    },
  });

export const putRebootAuth = (serialNumber: string) => (
  sessionId: string,
  _username: string,
  password: string,
  url: string,
) =>
  axios.put<{
    Result: boolean;
    Error?: string;
  }>(
    `${url}/api/Devices/${serialNumber}/Reboot`,
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

export const getDevicesAuth = () => (
  sessionId: string,
  _username: string,
  _password: string,
  url: string,
) =>
  axios.get<Devices>(`${url}/api/Devices`, {
    headers: {
      sessionId,
    },
  });

// export const postDeviceProfilesAuth = (deviceProfile: DeviceProfile) => (sessionId: string) =>
//   axios.post<void>(
//     `${url}/api/DeviceProfile`,
//     {
//       DeviceProfile: deviceProfile,
//     },
//     {
//       headers: {
//         sessionId,
//       },
//     },
//   );

export const deleteDeviceProfilesAuth = (deviceProfileId: string) => (
  sessionId: string,
  _username: string,
  _password: string,
  url: string,
) =>
  axios.delete<void>(`${url}/api/DeviceProfile/${deviceProfileId}`, {
    headers: {
      sessionId,
    },
  });

export const putDeviceProfilesAuth = (deviceProfile: DeviceProfile) => (
  sessionId: string,
  _username: string,
  _password: string,
  url: string,
) =>
  axios.put<void>(
    `${url}/api/DeviceProfile`,
    {
      DeviceProfile: deviceProfile,
    },
    {
      headers: {
        sessionId,
      },
    },
  );

export const postDeviceProfilesAuth = (deviceProfile: DeviceProfile) => (
  sessionId: string,
  _username: string,
  _password: string,
  url: string,
) =>
  axios.post<void>(
    `${url}/api/DeviceProfile`,
    {
      DeviceProfile: deviceProfile,
    },
    {
      headers: {
        sessionId,
      },
    },
  );
