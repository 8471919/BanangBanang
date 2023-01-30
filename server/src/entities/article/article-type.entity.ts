import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity('ARTICLE_TYPE')
export class ArticleTypeEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { unique: true, nullable: false })
  type: string;

  @OneToMany(() => ArticleEntity, (articles) => articles.articleType)
  articles: ArticleEntity[];
}
