import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Keyword {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    href: string;
}
