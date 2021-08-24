import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: string;
    
    @Column()
    productId: string;
    
    @Column()
    productName: string;
    
    @Column()
    qty: number;
    
    @Column()
    unitPrice: number;
    
    @Column()
    totalPrice: number;
    
    @Column()
    userId: string;

    @Column()
    status: string;
}