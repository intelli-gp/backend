import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: config.get('GOOGLE_CALLBACK_URL'),
      scope: [
        'email',
        'profile',
        'openid',
        'https://www.googleapis.com/auth/user.birthday.read',
        'https://www.googleapis.com/auth/user.phonenumbers.read',
      ],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // TODO: write logic and type of profile
    // check if user exists
    // if not create
    const user = await this.authService.validateGoogleUser(profile);
    console.log('PRint out the scope here');
    console.log(profile);
    return user;
  }
}
