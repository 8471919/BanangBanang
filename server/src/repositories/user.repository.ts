import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user/user.entity';
import {
  getUserForLogInOutboundPortInputDto,
  getUserForLogInOutboundPortOutputDto,
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
    params: getUserForLogInOutboundPortInputDto,
  ): Promise<getUserForLogInOutboundPortOutputDto> {
    console.log('User Repo');
    console.log(this.userRepository);
    return await this.userRepository.findOne({
      where: {
        email: params.email,
      },
      withDeleted: true,
    });
  }
}
