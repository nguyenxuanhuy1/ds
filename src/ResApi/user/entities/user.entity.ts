import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    passWord: string;
    
    @Column()
    conFirmPassWord: string;

    @Column()
    gmail: string;
}
