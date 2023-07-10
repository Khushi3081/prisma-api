export enum registerType {
  Platform,
  google,
}
export default class UpdateUserDto {
  id: number;
  name: string;
  email: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
