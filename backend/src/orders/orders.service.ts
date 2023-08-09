import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Between, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UsersService } from 'src/users/users.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private usersService: UsersService,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    const user = await this.usersService.findOne({
      id: userId,
    });

    return this.ordersRepository.save(
      this.ordersRepository.create({
        ...createOrderDto,
        user: user,
      }),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.ordersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Order>) {
    return this.ordersRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateOrderDto: any) {
    return this.ordersRepository.save(
      this.ordersRepository.create({
        id,
        ...updateOrderDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.ordersRepository.softDelete(id);
  }

  async available_orders(user: User): Promise<Order[]> {
    const userEntity = await this.usersService.findOne({
      id: user.id,
    });

    if (userEntity) {
      console.log(userEntity.orders);
      return userEntity.orders;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            Path: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async confirmed_order(user: User, body: any): Promise<any> {
    const { ConfirmationNumber } = body;
    const userEntity = await this.usersService.findOne({
      id: user.id,
    });

    if (userEntity) {
      const order = userEntity.orders.find((order) => {
        return order.confirmationNumber === ConfirmationNumber;
      });

      if (order) {
        order.confirmationNumber = null;
        await this.ordersRepository.save(order);
        return order;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              Path: 'notFound',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }

  async count_orders(): Promise<any> {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const lastMonth = currentMonth - 1 || 12;

    const ordersCurrentMonth = await this.ordersRepository.find({
      where: {
        createdAt: Between(
          new Date(now.getFullYear(), currentMonth - 1, 1),
          new Date(now.getFullYear(), currentMonth, 0, 23, 59, 59),
        ),
      },
    });

    const ordersLastMonth = await this.ordersRepository.find({
      where: {
        createdAt: Between(
          new Date(now.getFullYear(), lastMonth - 1, 1),
          new Date(now.getFullYear(), lastMonth, 0, 23, 59, 59),
        ),
      },
    });

    const totalorders = await this.ordersRepository.count();

    return {
      difference: ordersCurrentMonth.length - ordersLastMonth.length,
      total: totalorders,
    };
  }

  async get_orders(): Promise<any> {
    const orders = await this.ordersRepository.find();
    return orders;
  }
}
