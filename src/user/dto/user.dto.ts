export enum registerType {
  Platform,
  google,
}

export default class userDataDto {
  id: number;
  name: string;
  email: string;
  password: string;
  googleProviderId: string;
  registerType: registerType;
  role_id: number;
}
