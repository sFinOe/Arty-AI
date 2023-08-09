import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Order } from './order.entity';

@Entity()
export class Billing extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  state: string | null;

  @Column()
  zip: string;

  @Column()
  country: string;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;
}
