import { ServiceOffer } from './serviceOffer.entity';
import { RegExpColumn } from '../columns/regexp';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column({ length: 500, default: null })
    url: string;

    @Column({ length: 500, default: null })
    affiliateLink: string;

    @Column({ length: 500, default: null })
    logo: string;

    @Column({ length: 500, default: null })
    rateSymbol: string;

    @Column('int', { default: 100 })
    priority: number;

    // @RegExpColumn()
    // linkMatch: RegExp;

    @OneToMany(type => ServiceOffer, serviceOffer => serviceOffer.offer)
    serviceOffers: number[];
}
