export const USER_REPOSITORY_OUTBOUND_PORT =
  'USER_REPOSITORY_OUTBOUND_PORT' as const;

export type GetUserForLogInOutboundPortInputDto = {
  email: string;
};
export type GetUserForLogInOutboundPortOutputDto = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  email: string;
  password: string;
  googleId: string | null;
};

export type FindUserForDeserializeOutboundPortInputDto = {
  userId: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  done: Function;
};
export type FindUserForDeserializeOutboundPortOPutputDto = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  email: string;
  googleId: string | null;
};

export interface UserRepositoryOutboundPort {
  getUserForLogIn(
    params: GetUserForLogInOutboundPortInputDto,
  ): Promise<GetUserForLogInOutboundPortOutputDto>;

  findUserForDeserialize(
    params: FindUserForDeserializeOutboundPortInputDto,
  ): Promise<FindUserForDeserializeOutboundPortOPutputDto>;
}
