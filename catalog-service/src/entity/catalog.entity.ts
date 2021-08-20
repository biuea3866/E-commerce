import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CatalogEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: string;
    
    @Column()
    productName: string;
    
    @Column()
    stock: number;
    
    @Column()
    unitPrice: number;
}