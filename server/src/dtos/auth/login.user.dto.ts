import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user/user.entity';

export class LogInUserDto extends PickType(UserEntity, [
  'email',
  'password',
] as const) {}
