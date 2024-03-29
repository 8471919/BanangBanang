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

export type FindCommentsByUserIdOutboundPortInputDto = {
  userId: string;
};
export type FindCommentsByUserIdOutboundPortOutputDto = Pick<
  CommentEntity,
  'articleId' | 'content' | 'createdAt' | 'id' | 'userId' | 'updatedAt'
>[];

export type UpdateCommentOutboundPortInputDto = {
  commentId: string;
  content: string;
  userId: string;
};
export type UpdateCommentOutboundPortOutputDto = {
  affected: number | undefined;
};

export type DeleteCommentOutboundPortInputDto = {
  userId: string;
  commentId: string;
};
export type DeleteCommentOutboundPortOutputDto = {
  affected: number | undefined;
};

export interface CommentRepositoryOutboundPort {
  saveComment(
    params: SaveCommentOutboundPortInputDto,
  ): Promise<SaveCommentOutboundPortOutputDto>;

  findCommentsByUserId(
    params: FindCommentsByUserIdOutboundPortInputDto,
  ): Promise<FindCommentsByUserIdOutboundPortOutputDto>;

  updateComment(
    params: UpdateCommentOutboundPortInputDto,
  ): Promise<UpdateCommentOutboundPortOutputDto>;

  deleteComment(
    params: DeleteCommentOutboundPortInputDto,
  ): Promise<DeleteCommentOutboundPortOutputDto>;
}
