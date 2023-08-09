import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { Price } from './entities/prices.entity';
@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(Price)
    private productRepository: Repository<Price>,
  ) {}

  create(createProductDto: any) {
    return this.productRepository.save(
      this.productRepository.create(createProductDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.productRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Price>) {
    return this.productRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateProductDto: any) {
    return this.productRepository.save(
      this.productRepository.create({
        id,
        ...updateProductDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.productRepository.softDelete(id);
  }

  async savePrices(user: any, body: any): Promise<any> {
    const price = await this.productRepository.findOne({
      where: {
        id: 1,
      },
    });

    if (!price) {
      return await this.productRepository.save(
        this.productRepository.create({
          ...body,
        }),
      );
    } else {
      return await this.productRepository.update({ id: 1 }, { ...body });
    }
  }

  async getprices(user: any, body: any): Promise<any> {
    const prices = await this.productRepository.findOne({
      where: {
        id: 1,
      },
    });
  }
}
