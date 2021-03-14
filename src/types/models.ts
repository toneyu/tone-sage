export type DeviceProfile = {
  Id: string;
  Version: string;
  Name: string;
  Description: string;
  Type: number;
  TypeName: string;
  UseSageVue: boolean;
  MonitorDevices: boolean;
  Components: Components[];
};

export type Components = {
  Name: string;
  Type: number;
  TypeName: string;
  IncludeInProfile: string;
  Settings: Setting[];
};

export type Setting = {
  Type: number;
  TypeName: string;
  ElementNumber: number;
  DataType: string;
  Value: boolean | string;
  IncludeInProfile: string;
  Settings: Setting[];
};

export enum SettingType {
  EnableTelnet = 101,
  EnableMulticast = 102,
  EnableSSH = 103,
}

export interface TesiraDevice {
  Model: string;
  ModelDescription: string;
  SystemDescription: string;
  FirmwareVersion: string;
  OccupiedStatus: string;
  AssetGroupId: string;
  IsControlled: boolean;
  SystemId: string;
  SerialNumber: string;
  HostName: string;
  Description: string;
  IsProtected: boolean;
  Faults: unknown[];
  Status: number;
  Labels: unknown[];
}

export interface Devices {
  TesiraDevices: TesiraDevice[];
  TesiraErrors: string[];
  DevioDevices: unknown[];
  DevioErrors: string[];
  AtomDevices: unknown[];
  AtomErrors: string[];
  DynasoundDevices: unknown[];
  DynasoundErrors: string[];
  QtProDevices: unknown[];
  QtProErrors: string[];
}
