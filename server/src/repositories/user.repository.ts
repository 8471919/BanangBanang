import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user/user.entity';
import {
  FindUserForDeserializeOutboundPortInputDto,
  FindUserForDeserializeOutboundPortOPutputDto,
  GetUserByEmailOutboundPortInputDto,
  GetUserByEmailOutboundPortOutputDto,
  GetUserForLogInOutboundPortInputDto,
  GetUserForLogInOutboundPortOutputDto,
  SaveUserOutboundPortInputDto,
  UserRepositoryOutboundPort,
} from 'src/outbound-ports/user/user-repository.outbound-port';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements UserRepositoryOutboundPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserForLogIn(
    params: GetUserForLogInOutboundPortInputDto,
  ): Promise<GetUserForLogInOutboundPortOutputDto> {
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

  async getUserByEmail(
    params: GetUserByEmailOutboundPortInputDto,
  ): Promise<GetUserByEmailOutboundPortOutputDto> {
    return await this.userRepository.findOne({
      where: {
        email: params.email,
      },
      withDeleted: true,
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
}
