export const USER_REPOSITORY_OUTBOUND_PORT =
  'USER_REPOSITORY_OUTBOUND_PORT' as const;

export type FindUserForLogInOutboundPortInputDto = {
  email: string;
};
export type FindUserForLogInOutboundPortOutputDto = {
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

export type FindUserByEmailOutboundPortInputDto = {
  email: string;
};
export type FindUserByEmailOutboundPortOutputDto = {
  id: string;
};

export type FindUserByGoogleIdOutboundPortInputDto = {
  googleId: string;
};
export type FindUserByGoogleIdOutboundPortOutputDto = {
  googleId: string;
};

export type SaveUserOutboundPortInputDto = {
  email: string;
  hashedPassword: string;
};

export type SaveGoogleUserOutboundPortInputDto = {
  googleId: string;
  email: string;
};
export type SaveGoogleUserOutboundPortOutputDto = {
  googleId: string;
};

export interface UserRepositoryOutboundPort {
  findUserForLogIn(
    params: FindUserForLogInOutboundPortInputDto,
  ): Promise<FindUserForLogInOutboundPortOutputDto>;

  findUserForDeserialize(
    params: FindUserForDeserializeOutboundPortInputDto,
  ): Promise<FindUserForDeserializeOutboundPortOPutputDto>;

  findUserByEmail(
    params: FindUserByEmailOutboundPortInputDto,
  ): Promise<FindUserByEmailOutboundPortOutputDto>;

  findUserByGoogleId(
    params: FindUserByGoogleIdOutboundPortInputDto,
  ): Promise<FindUserByGoogleIdOutboundPortOutputDto>;

  saveUser(params: SaveUserOutboundPortInputDto): unknown;

  saveGoogleUser(
    params: SaveGoogleUserOutboundPortInputDto,
  ): Promise<SaveGoogleUserOutboundPortOutputDto>;
}
