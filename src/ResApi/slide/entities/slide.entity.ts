import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Slide {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @Column()
    href: string;
}
