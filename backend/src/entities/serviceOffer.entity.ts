import { Service } from './service.entity';
import { Offer } from './offer.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class ServiceOffer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Offer, offer => offer.serviceOffers)
  offer: Offer;
  
  @ManyToOne(type => Service, service => service.serviceOffers)
  service: Service;

  @Column({ 
    length: 500,
    default: null
  })
  confirmTime: string;

  @Column({ length: 1000 })
  rates: string;

  @Column({
    length: 500,
    default: null,
  })
  conditions: string;

  @Column({ length: 150 })
  cashback: string;
}
