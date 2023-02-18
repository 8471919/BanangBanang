import { Column, Entity, OneToMany } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { CommentEntity } from '../comment/comment.entity';
import { CommonBigPKEntity } from '../common/common.entity';

@Entity('USER')
export class UserEntity extends CommonBigPKEntity {
  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Column('varchar', { unique: false, nullable: false })
  password: string;

  @Column('varchar', { unique: true, nullable: true })
  googleId: string | null;

  @OneToMany(() => ArticleEntity, (articles) => articles.user)
  articles: ArticleEntity[];

  @OneToMany(() => CommentEntity, (comments) => comments.user)
  comments: CommentEntity[];
}
