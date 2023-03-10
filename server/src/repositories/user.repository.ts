import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user/user.entity';
import {
  FindUserByEmailOutboundPortInputDto,
  FindUserByEmailOutboundPortOutputDto,
  FindUserForLogInOutboundPortInputDto,
  FindUserForLogInOutboundPortOutputDto,
  SaveUserOutboundPortInputDto,
  UserRepositoryOutboundPort,
  FindUserByGoogleIdOutboundPortInputDto,
  FindUserByGoogleIdOutboundPortOutputDto,
  SaveGoogleUserOutboundPortInputDto,
  SaveGoogleUserOutboundPortOutputDto,
  FindUserForDeserializeOutboundPortOPutputDto,
  FindUserForDeserializeOutboundPortInputDto,
} from 'src/outbound-ports/user/user-repository.outbound-port';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements UserRepositoryOutboundPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUserForLogIn(
    params: FindUserForLogInOutboundPortInputDto,
  ): Promise<FindUserForLogInOutboundPortOutputDto> {
    return await this.userRepository.findOne({
      where: {
        email: params.email,
      },
      withDeleted: true,
    });
  }

  async findUserForDeserialize(
    params: FindUserForDeserializeOutboundPortInputDto,
  ): Promise<FindUserForDeserializeOutboundPortOPutputDto> {
    return await this.userRepository
      .findOneOrFail({
        where: { id: params.userId },
        withDeleted: true,
      })
      .then((user) => {
        console.log('user', user);
        params.done(null, user);
      })
      .catch((err) => params.done(err));
  }

  async findUserByEmail(
    params: FindUserByEmailOutboundPortInputDto,
  ): Promise<FindUserByEmailOutboundPortOutputDto> {
    return await this.userRepository.findOne({
      where: {
        email: params.email,
      },
      withDeleted: true,
    });
  }

  async findUserByGoogleId(
    params: FindUserByGoogleIdOutboundPortInputDto,
  ): Promise<FindUserByGoogleIdOutboundPortOutputDto> {
    return this.userRepository.findOne({
      where: {
        googleId: params.googleId,
      },
    });
  }

  async saveUser(
    params: SaveUserOutboundPortInputDto,
  ): Promise<UserEntity> | undefined {
    return await this.userRepository.save({
      email: params.email,
      password: params.hashedPassword,
    });
  }

  async saveGoogleUser(
    params: SaveGoogleUserOutboundPortInputDto,
  ): Promise<SaveGoogleUserOutboundPortOutputDto> {
    return this.userRepository.save({
      email: params.email,
      googleId: params.googleId,
    });
  }
}
