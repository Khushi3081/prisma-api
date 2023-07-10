export enum register_type {
  Platform,
  google,
}

export default class userDataDto {
  id: number;
  name: string;
  email: string;
  password: string;
  google_provider_id: string;
  register_type: register_type;
  role_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
