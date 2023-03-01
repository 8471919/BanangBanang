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

export type ValidateUserForGoogleInboundInputDto = {
  provider?: string;
  providerId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  picture?: string;
  accessToken: string;
  refreshToken?: string;
};
export type ValidateUserForGoogleInboundOutputDto = {
  googleId: string;
};

export interface AuthControllerInboundPort {
  validateUser(
    params: ValidateUserInboundInputDto,
  ): Promise<ValidateUserInboundOutputDto>;

  register(params: RegisterInboundInputDto): Promise<RegisterInboundOutputDto>;

  validateUserForGoogle(
    params: ValidateUserForGoogleInboundInputDto,
  ): Promise<ValidateUserForGoogleInboundOutputDto>;
}
