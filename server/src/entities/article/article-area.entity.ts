import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity('ARTICLE_AREA')
export class ArticleAreaEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { unique: true, nullable: false })
  area: string;

  @OneToMany(() => ArticleEntity, (articles) => articles.articleArea)
  articles: ArticleEntity[];
}
