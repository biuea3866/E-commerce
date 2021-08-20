import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column()
    nickname: string;
    
    @Column()
    userId: string;
    
    @Column()
    encryptedPwd: string;
}