import { RegExpColumn } from '../columns/regexp';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  url: string;

  // @Column({ length: 500 })
  // affiliateLink: string;

  @Column({ length: 500 })
  logo: string;

  @RegExpColumn()
  linkMatch: RegExp;

  // @Column({ length: 500 })
  // conditions: string;
}
