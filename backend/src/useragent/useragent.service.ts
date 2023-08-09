import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateUseragentDto } from './dto/create-useragent.dto';
import { UserAgent } from './entities/useragent.entity';

@Injectable()
export class UseragentService {
  constructor(
    @InjectRepository(UserAgent)
    private UseragentRepository: Repository<UserAgent>,
  ) {}

  async create(createUseragentDto: CreateUseragentDto) {
    return this.UseragentRepository.save(
      this.UseragentRepository.create(createUseragentDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.UseragentRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<UserAgent>) {
    return this.UseragentRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateUseragentDto: any) {
    return this.UseragentRepository.save(
      this.UseragentRepository.create({
        id,
        ...updateUseragentDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.UseragentRepository.softDelete(id);
  }

  async count_agents(): Promise<{}> {
    const devices = await this.UseragentRepository.query(
      `SELECT device, COUNT(device) AS count FROM user_agent GROUP BY device`,
    );
    return devices;
  }
}
