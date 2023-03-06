import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user/user.entity';

export class RegisterUserDto extends PickType(UserEntity, [
  'email',
  'password',
] as const) {}
