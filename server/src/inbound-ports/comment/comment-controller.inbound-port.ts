import { CommentEntity } from 'src/entities/comment/comment.entity';

export const COMMENT_CONTROLLER_INBOUND_PORT =
  'COMMENT_CONTROLLER_INBOUND_PORT' as const;

export type CreateCommentInboundPortInputDto = Pick<
  CommentEntity,
  'articleId' | 'content' | 'depth' | 'parentId' | 'userId'
>;
export type CreateCommentInboundPortOutputDto = Pick<
  CommentEntity,
  | 'articleId'
  | 'content'
  | 'depth'
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'parentId'
  | 'userId'
>;

export interface CommentControllerInboundPort {
  createComment(
    params: CreateCommentInboundPortInputDto,
  ): Promise<CreateCommentInboundPortOutputDto>;
}
