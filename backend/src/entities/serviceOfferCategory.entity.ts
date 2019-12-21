import { Category } from './category.entity';
import { ServiceOffer } from './serviceOffer.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class ServiceOfferCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Category)
  @JoinColumn()
  category: Category;
  
  @OneToOne(type => ServiceOffer)
  @JoinColumn()
  serviceOffer: ServiceOffer;

  @Column()
  cashback: number;
}
