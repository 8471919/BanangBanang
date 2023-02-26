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

  async saveUser(
    params: SaveUserOutboundPortInputDto,
  ): Promise<UserEntity> | undefined {
    return await this.userRepository.save({
      email: params.email,
      password: params.hashedPassword,
    });
  }
}
