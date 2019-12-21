import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
