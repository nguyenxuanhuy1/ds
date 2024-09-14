import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  image: string;

  @Column()
  href: string;

  @Column({ default: false })
  openInNewTab: boolean;
}
