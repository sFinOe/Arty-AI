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
export class Product extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: string;

  @Column()
  price: number;

  @Column()
  ImgUrl: string;

  @Column()
  type: string;

  @Column()
  itemReferenceId: string;

  @Column()
  productUid: string;

  @Column()
  quantity: number;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;
}
