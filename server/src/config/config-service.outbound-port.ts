export const CONFIG_SERVICE_OUTBOUND_PORT =
  'CONFIG_SERVICE_OUTBOUND_PORT' as const;

export type GetSaltForHashOutboundPortInputDto = void;
export type GetSaltForHashOutboundPortOutputDto = number;

export interface ConfigServiceOutboundPort {
  getSaltForHash(
    params: GetSaltForHashOutboundPortInputDto,
  ): Promise<GetSaltForHashOutboundPortOutputDto>;
}
