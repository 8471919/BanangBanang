import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import {
  RedisDelOutboundInputDto,
  RedisDelOutboundOutputDto,
  RedisGetOutboundOutputDto,
  RedisGetOutbountInputDto,
  RedisRepositoryOutboundPort,
  RedisResetOutboundInputDto,
  RedisResetOutboundOutputDto,
  RedisSetOutboundInputDto,
  RedisSetOutboundOutputDto,
} from './redis-repository.outbound-port';

export class RedisRepository implements RedisRepositoryOutboundPort {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  async get(params: RedisGetOutbountInputDto): RedisGetOutboundOutputDto {
    return await this.cacheManager.get(params.key);
  }

  async set(params: RedisSetOutboundInputDto): RedisSetOutboundOutputDto {
    await this.cacheManager.set(params.key, params.value, params.ttl);
  }

  async del(params: RedisDelOutboundInputDto): RedisDelOutboundOutputDto {
    await this.cacheManager.del(params.key);
  }

  async reset(params: RedisResetOutboundInputDto): RedisResetOutboundOutputDto {
    await this.cacheManager.reset();
  }
}
