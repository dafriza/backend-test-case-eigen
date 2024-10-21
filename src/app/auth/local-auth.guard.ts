import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { dir, log } from 'console';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = await context.switchToHttp().getRequest();
    await super.logIn(request); // Attach session to request
    return result;
    // return request;
  }
}
