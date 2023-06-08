import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '711366361643-bb7st8kerdka1d4fftd2ncd7re2dj05p.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'https://f780-103-215-158-90.ngrok-free.app/google/callback',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    done(null, profile);
  }
}
