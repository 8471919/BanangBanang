import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ConfigServiceOutboundPort,
  GetSaltForHashOutboundPortOutputDto,
} from './config-service.outbound-port';

@Injectable()
export class EnvService implements ConfigServiceOutboundPort {
  constructor(private readonly configService: ConfigService) {}

  async getSaltForHash(): Promise<GetSaltForHashOutboundPortOutputDto> {
    return await this.configService.get('BCRYPT_HASH_SALT');
  }
}
