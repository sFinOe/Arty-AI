import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Billing } from './entities/billing.entity';
import { CreateBillingDto } from './dto/create-billing.dto';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing)
    private billingRepository: Repository<Billing>,
  ) {}

  create(createBillingDto: CreateBillingDto) {
    return this.billingRepository.save(
      this.billingRepository.create(createBillingDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.billingRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Billing>) {
    return this.billingRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateBillingDto: any) {
    return this.billingRepository.save(
      this.billingRepository.create({
        id,
        ...updateBillingDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.billingRepository.softDelete(id);
  }
}
