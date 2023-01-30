import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { CommonBigPKEntity } from '../common/common.entity';
import { UserEntity } from '../user/user.entity';

@Entity('COMMENT')
export class CommentEntity extends CommonBigPKEntity {
  @Column('bigint', { unique: false, nullable: true })
  commentId: string | null;

  @Column('text', { unique: false, nullable: false })
  content: string;

  @Column('int', { unique: false, nullable: false, default: () => '0' })
  depth: number;

  @Column('bigint', { unique: false, nullable: false })
  userId: string;

  @Column('bigint', { unique: false, nullable: false })
  articleId: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  @JoinColumn({ name: 'articleId', referencedColumnName: 'id' })
  article: ArticleEntity;
}
