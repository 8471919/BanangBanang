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

export type RegisterInboundInputDto = {
  email: string;
  password: string;
};
export type RegisterInboundOutputDto = void;

export interface AuthControllerInboundPort {
  validateUser(
    params: ValidateUserInboundInputDto,
  ): Promise<ValidateUserInboundOutputDto>;

  register(params: RegisterInboundInputDto): Promise<RegisterInboundOutputDto>;
}
