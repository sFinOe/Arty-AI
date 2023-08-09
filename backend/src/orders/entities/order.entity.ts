import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Expose } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { Shipping } from './shipping.entity';
import { Product } from './product.entity';
import { Billing } from './billing.entity';

@Entity()
export class Order extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  // @Expose({ groups: ['me', 'admin'] })
  orderId: string;

  @BeforeInsert()
  async setOrderId() {
    const prefix = '#WHLVTR-';
    const count = (await Order.count()) + 1;
    this.orderId = prefix + count;
  }

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  subtotal: Number;

  @Column({ nullable: true })
  total: Number;

  @Column({ nullable: true })
  shippingType: string;

  @Column({ nullable: true })
  paymentMethod: string;

  @Column({ nullable: true })
  confirmationNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column({ nullable: true })
  trackingCode: string;

  @Column({ nullable: true })
  trackingUrl: string;

  @Column({ nullable: true })
  shipmentMethodName: string;

  @Column({ nullable: true })
  gelatoOrderId: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Shipping, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  shipping: Shipping;

  @OneToOne(() => Billing, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  billing: Billing;

  @OneToOne(() => Product, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  product: Product;
}
