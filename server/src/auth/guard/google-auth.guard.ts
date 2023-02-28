import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  // constructor(private readonly configService: ConfigService) {
  //   super({
  //     accessType: 'offline', // refreshToken을 위해 설정해주는 옵션.
  //   });
  // }
}
