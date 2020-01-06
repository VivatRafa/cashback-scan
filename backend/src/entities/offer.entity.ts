import { ServiceOffer } from './serviceOffer.entity';
import { RegExpColumn } from '../columns/regexp';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column({ length: 500 })
    url: string;

    @Column({ length: 500, default: '' })
    affiliateLink: string;

    @Column({ length: 500 })
    logo: string;

    @Column({ length: 500, default: '' })
    rateSymbol: string;

    @RegExpColumn()
    linkMatch: RegExp;

    @OneToMany(type => ServiceOffer, serviceOffer => serviceOffer.offer)
    serviceOffers: number[];
}
