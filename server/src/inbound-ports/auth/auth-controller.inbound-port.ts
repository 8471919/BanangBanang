export const AUTH_CONTROLLER_INBOUND_PORT =
  'AUTH_CONTROLLER_INBOUND_PORT' as const;

export type ValidateUserInboundInputDto = {
  email: string;
  password: string;
};
export type ValidateUserInboundOutputDto = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  email: string;
  googleId: string;
};

export type SerializeUserInboundInputDto = {
  user: string;
  date: number;
  ttl?: number;
};
export type SerializeUserInboundOutputDto = Promise<void>;

export type DeserializeUserInboundInputDto = {
  user: string;
};
export type DeserializeUserInboundOutputDto = Promise<number>;

export interface AuthControllerInboundPort {
  validateUser(
    params: ValidateUserInboundInputDto,
  ): Promise<ValidateUserInboundOutputDto>;

  serializeUser(
    params: SerializeUserInboundInputDto,
  ): Promise<SerializeUserInboundOutputDto>;

  deserializeUser(
    params: DeserializeUserInboundInputDto,
  ): Promise<DeserializeUserInboundOutputDto>;
}
