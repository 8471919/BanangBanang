import { CommentEntity } from 'src/entities/comment/comment.entity';

export const USER_CONTROLLER_INBOUND_PORT =
  'USER_CONTROLLER_INBOUND_PORT' as const;

export type ReadCommentsByUserIdInboundPortInputDto = {
  userId: string;
};
export type ReadCommentsByUserIdInboundPortOutputDto = Pick<
  CommentEntity,
  'articleId' | 'content' | 'createdAt' | 'id' | 'userId' | 'updatedAt'
>[];

export interface UserControllerInboundPort {
  readCommentsByUserId(
    params: ReadCommentsByUserIdInboundPortInputDto,
  ): Promise<ReadCommentsByUserIdInboundPortOutputDto>;
}
