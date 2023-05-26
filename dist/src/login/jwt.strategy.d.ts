import { Strategy } from "passport-jwt";
import { LoginService } from "./login.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private loginService;
    constructor(loginService: LoginService);
    chkUser(payload: any): Promise<{
        email: any;
        password: any;
    }>;
}
export {};
