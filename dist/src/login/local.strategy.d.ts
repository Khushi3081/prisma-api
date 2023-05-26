import { Strategy } from 'passport-local';
import { LoginService } from './login.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private loginService;
    constructor(loginService: LoginService);
    validate(email: any, password: any): Promise<any>;
}
export {};
