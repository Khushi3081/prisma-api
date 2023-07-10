export enum register_type {
  Platform,
  google,
  Byadmin,
}
export default class adminUserDataDto {
  id: number;
  name: string;
  email: string;
  role_id: number;
  register_type: register_type;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
