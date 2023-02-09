import { UserEntity } from 'src/entities/user/user.entity';
import {
  getUserForLogInOutboundPortInputDto,
  getUserForLogInOutboundPortOutputDto,
  UserRepositoryOutboundPort,
} from 'src/outbound-ports/user/user-repository.outbound-port';
import { CustomRepository } from 'src/settings/typeorm/custom-typeorm.decorator';
import { Repository } from 'typeorm';

@CustomRepository(UserEntity)
export class UserRepository
  extends Repository<UserEntity>
  implements UserRepositoryOutboundPort
{
  async getUserForLogIn(
    params: getUserForLogInOutboundPortInputDto,
  ): Promise<getUserForLogInOutboundPortOutputDto> {
    return await this.findOne({
      where: {
        email: params.email,
      },
      withDeleted: true,
    });
  }
}
