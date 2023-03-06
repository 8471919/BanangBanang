import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  // constructor(private readonly configService: ConfigService) {
  //   super({
  //     accessType: 'offline', // refreshToken을 위해 설정해주는 옵션.
  //   });
  // }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('googleAuthGuard1');
    const can = await super.canActivate(context);
    console.log('googleAuthGuard2');
    if (can) {
      console.log('In can');
      const request = context.switchToHttp().getRequest();
      console.log(request.isAuthenticated());
      await super.logIn(request);
    }
    console.log('googleAuthGuard3');
    return true;
  }
}
