export declare enum registerType {
    Platform = 0,
    google = 1
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
