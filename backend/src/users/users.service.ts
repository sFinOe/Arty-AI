import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository, Between } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createProfileDto: CreateUserDto) {
    return this.usersRepository.save(
      this.usersRepository.create(createProfileDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.usersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<User>) {
    return this.usersRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateProfileDto: UpdateUserDto) {
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...updateProfileDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  async count_customers(): Promise<any> {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const lastMonth = currentMonth - 1 || 12;

    const customersCurrentMonth = await this.usersRepository.count({
      where: {
        role: {
          id: 2,
        },
        createdAt: Between(
          new Date(now.getFullYear(), currentMonth - 1, 1),
          new Date(now.getFullYear(), currentMonth, 0, 23, 59, 59),
        ),
      },
    });

    const customersLastMonth = await this.usersRepository.count({
      where: {
        role: {
          id: 2,
        },
        createdAt: Between(
          new Date(now.getFullYear(), lastMonth - 1, 1),
          new Date(now.getFullYear(), lastMonth, 0, 23, 59, 59),
        ),
      },
    });

    const totalcustomers = await this.usersRepository.count({
      where: {
        role: {
          id: 2,
        },
      },
    });

    return {
      total: totalcustomers,
      difference: customersCurrentMonth - customersLastMonth,
    };
  }

  async get_customers(): Promise<any> {
    const customers = await this.usersRepository.find({
      where: {
        role: {
          id: 2,
        },
      },
    });

    return customers;
  }
}
