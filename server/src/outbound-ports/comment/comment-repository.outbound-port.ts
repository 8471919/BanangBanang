import { CommentEntity } from 'src/entities/comment/comment.entity';

export const COMMENT_REPOSITORY_OUTBOUND_PORT =
  'COMMENT_REPOSITORY_OUTBOUND_PORT' as const;

export type SaveCommentOutboundPortInputDto = Pick<
  CommentEntity,
  'parentId' | 'articleId' | 'content' | 'depth' | 'userId'
>;
export type SaveCommentOutboundPortOutputDto = Pick<
  CommentEntity,
  | 'id'
  | 'articleId'
  | 'content'
  | 'parentId'
  | 'createdAt'
  | 'updatedAt'
  | 'depth'
  | 'userId'
>;

export interface CommentRepositoryOutboundPort {
  saveComment(
    params: SaveCommentOutboundPortInputDto,
  ): Promise<SaveCommentOutboundPortOutputDto>;
}
