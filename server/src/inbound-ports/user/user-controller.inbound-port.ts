export const USER_CONTROLLER_INBOUND_PORT =
  'USER_CONTROLLER_INBOUND_PORT' as const;

export type LocalLogInInboundPortInputDto = void;
export type LocalLogInInboundPortOutputDto = void;

export interface UserControllerInboundPort {
  login(
    params: LocalLogInInboundPortInputDto,
  ): Promise<LocalLogInInboundPortOutputDto>;
}
