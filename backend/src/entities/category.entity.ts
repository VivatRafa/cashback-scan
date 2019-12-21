import { ServiceOffer } from './serviceOffer.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('int')
  cashback: number;

  @ManyToOne(type => ServiceOffer, serviceOffer => serviceOffer.categories)
  serviceOffer: ServiceOffer;
}
