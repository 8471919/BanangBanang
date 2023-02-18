export const REDIS_REPOSITORY_OUTBOUND_PORT =
  'REDIS_REPOSITORY_OUTBOUND_PORT' as const;

export type RedisGetOutbountInputDto = {
  key: string;
};
export type RedisGetOutboundOutputDto = Promise<any>;

export type RedisSetOutboundInputDto = {
  key: string;
  value: any;
  ttl?: number;
};
export type RedisSetOutboundOutputDto = Promise<void>;

export type RedisDelOutboundInputDto = {
  key: string;
};
export type RedisDelOutboundOutputDto = Promise<void>;

export type RedisResetOutboundInputDto = void;
export type RedisResetOutboundOutputDto = Promise<void>;

export interface RedisRepositoryOutboundPort {
  get(params: RedisGetOutbountInputDto): RedisGetOutboundOutputDto;

  set(params: RedisSetOutboundInputDto): RedisSetOutboundOutputDto;

  del(params: RedisDelOutboundInputDto): RedisDelOutboundOutputDto;

  reset(params: RedisResetOutboundInputDto): RedisResetOutboundOutputDto;
}
