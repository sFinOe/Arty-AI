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

@Entity()
export class Price extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: 20 })
  product_13x18: number;

  @Column({ nullable: true, default: 20 })
  product_15x20: number;

  @Column({ nullable: true, default: 20 })
  product_20x25: number;

  @Column({ nullable: true, default: 20 })
  product_21x29: number;

  @Column({ nullable: true, default: 20 })
  product_25x25: number;

  @Column({ nullable: true, default: 20 })
  product_27x35: number;

  @Column({ nullable: true, default: 20 })
  product_30x30: number;

  @Column({ nullable: true, default: 20 })
  product_40x50: number;

  @Column({ nullable: true, default: 20 })
  product_60x90: number;

  @Column({ nullable: true, default: 20 })
  product_29x42: number;

  @Column({ nullable: true, default: 20 })
  product_42x59: number;

  @Column({ nullable: true, default: 20 })
  product_59x84: number;

  @Column({ nullable: true, default: 15 })
  expressShipping: number;
}
