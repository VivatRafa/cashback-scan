import { ServiceOffer } from './serviceOffer.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  url: string;

  @Column({ length: 500 })
  apiUrl: string;
  
  @OneToMany(type => ServiceOffer, serviceOffer => serviceOffer.service)
  serviceOffers: number[]
}
