import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { Shipping } from './entities/shipping.entity';
import { CreateShippingDto } from './dto/create-shipping.dto';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(Shipping)
    private shippingRepository: Repository<Shipping>,
  ) {}

  create(createShippingDto: CreateShippingDto) {
    return this.shippingRepository.save(
      this.shippingRepository.create(createShippingDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.shippingRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Shipping>) {
    return this.shippingRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateShippingDto: any) {
    return this.shippingRepository.save(
      this.shippingRepository.create({
        id,
        ...updateShippingDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.shippingRepository.softDelete(id);
  }
}
