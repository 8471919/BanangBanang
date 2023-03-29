import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user/user.entity';

export class GetUserIdDto extends PickType(UserEntity, ['id']) {}
