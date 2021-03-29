export type DeviceProfile = {
  Id: string;
  Version: string;
  Name: string;
  Description: string;
  Type: SageType;
  TypeName: string;
  UseSageVue: boolean;
  MonitorDevices: boolean;
  Components: Component[];
};

export type Component = {
  Name: string;
  Type: SageType;
  TypeName: string;
  IncludeInProfile: IncludeInProfile;
  Settings: Setting[];
};

export type Setting = {
  Type?: SageType;
  TypeName?: string;
  ElementNumber?: number;
  DataType?: string;
  Value?: boolean | string;
  IncludeInProfile: IncludeInProfile;
  Settings?: Setting[];
};

export enum SageType {
  Network = 1,
  EnableTelnet = 101,
  EnableMulticast = 102,
  EnableSSH = 103,
  Domain = 104,
  NetworkDNS = 105,
  PrimaryDNS = 106,
  SecondaryDNS = 107,
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

export enum IncludeInProfile {
  Yes = 'Yes',
  No = 'No',
  NotApplicable = 'NotApplicable',
}
