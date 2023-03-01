export const CONFIG_SERVICE_OUTBOUND_PORT =
  'CONFIG_SERVICE_OUTBOUND_PORT' as const;

export type GetSaltForHashOutboundPortInputDto = void;
export type GetSaltForHashOutboundPortOutputDto = number;

export type GetGoogleOAuthClientIdOutboundPortInputDto = void;
export type GetGoogleOAuthClientIdOutboundPortOutputDto = string;

export type GetGoogleOAuthClientSecretOutboundPortInputDto = void;
export type GetGoogleOAuthClientSecretOutboundPortOutputDto = string;

export interface ConfigServiceOutboundPort {
  getSaltForHash(
    params: GetSaltForHashOutboundPortInputDto,
  ): Promise<GetSaltForHashOutboundPortOutputDto>;

  // getGoogleOAuthClientId(
  //   params: GetGoogleOAuthClientIdOutboundPortInputDto,
  // ): Promise<GetGoogleOAuthClientIdOutboundPortOutputDto>;

  // getGoogleOAuthClientSecret(
  //   params: GetGoogleOAuthClientSecretOutboundPortInputDto,
  // ): Promise<GetGoogleOAuthClientSecretOutboundPortOutputDto>;
}
