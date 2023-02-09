export const USER_REPOSITORY_OUTBOUND_PORT =
  'USER_REPOSITORY_OUTBOUND_PORT' as const;

export type getUserForLogInOutboundPortInputDto = {
  email: string;
};
export type getUserForLogInOutboundPortOutputDto = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  email: string;
  password: string;
  googleId: string | null;
};

export interface UserRepositoryOutboundPort {
  getUserForLogIn(
    params: getUserForLogInOutboundPortInputDto,
  ): Promise<getUserForLogInOutboundPortOutputDto>;
}
