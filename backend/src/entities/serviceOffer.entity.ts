import { Service } from './service.entity';
import { Offer } from './offer.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';

@Entity()
export class ServiceOffer {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Offer, offer => offer.serviceOffers)
    offer: Offer;

    @Column({ nullable: true })
    offerId: number;

    @ManyToOne(type => Service, service => service.serviceOffers)
    service: Service;

    @Column({ nullable: true })
    serviceId: number;

    @Column({
        length: 500,
        default: null,
    })
    confirmTime: string;

    @Column('text', { default: null })
    rates: string;

    @Column('text', {
        default: null,
    })
    conditions: string;

    @Column({ length: 150 })
    cashback: string;
}
