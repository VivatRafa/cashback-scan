import { Category } from './category.entity';
import { Service } from './service.entity';
import { Offer } from './offer.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class ServiceOffer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Offer)
  @JoinColumn()
  offer: Offer;
  
  @OneToOne(type => Service)
  @JoinColumn() 
  service: Service;

  @Column({ length: 500 })
  confirmTime: string;

  @OneToMany(type => Category, category => category.serviceOffer)
  categories: Category[];
}
