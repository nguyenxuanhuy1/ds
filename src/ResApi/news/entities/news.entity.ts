import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    icon: string;

    @Column()
    text: string;

    @Column()
    href: string;
}
