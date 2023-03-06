import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('here is LocalAuthGuard1');
    const can = await super.canActivate(context);
    console.log('here is LocalAuthGuard2');
    if (can) {
      const request = context.switchToHttp().getRequest();
      console.log('here is LocalAuthGuard3');
      await super.logIn(request);
      console.log('here is LocalAuthGuard4');
    }
    return true;
  }
}
