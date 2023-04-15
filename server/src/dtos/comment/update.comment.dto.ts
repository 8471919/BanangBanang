import { PickType } from '@nestjs/swagger';
import { CommentEntity } from 'src/entities/comment/comment.entity';

export class UpdateCommentDto extends PickType(CommentEntity, ['content']) {}
