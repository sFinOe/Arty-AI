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

@Entity()
export class UserAgent extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @Expose({ groups: ['admin'] })
  ipAddress: string;

  @Column({ nullable: true })
  @Expose({ groups: ['admin'] })
  useragent: string;

  @Column({ nullable: true })
  @Expose({ groups: ['admin'] })
  device: string;
}
