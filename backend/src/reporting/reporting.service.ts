import { Injectable, HttpException, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/user.entity';
import Stripe from 'stripe';
import { UseragentService } from 'src/useragent/useragent.service';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class ReportingService {
  private stripe: Stripe;
  constructor(
    private usersService: UsersService,
    private useragentService: UseragentService,
    private ordersService: OrdersService,
  ) {
    this.stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
      apiVersion: '2022-11-15',
    });
  }

  async total_budget(): Promise<any> {
    const now = new Date();
    const year = now.getFullYear();
    let Balances = [];

    for (let month = 0; month < 12; month++) {
      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59);

      const balanceTransactions = await this.stripe.balanceTransactions.list({
        created: {
          gte: Math.floor(startOfMonth.getTime() / 1000),
          lte: Math.floor(endOfMonth.getTime() / 1000),
        },
      });

      const totalBalance = balanceTransactions.data.reduce(
        (total, transaction) => total + transaction.amount,
        0,
      );
      let difference = 0;
      if (month === now.getMonth()) {
        const previousBalance = Balances[month - 1].balance;
        const Balance = totalBalance / 100;
        difference = ((Balance - previousBalance) / Balance) * 100;
      }

      const monthbalance = {
        month: startOfMonth.toLocaleString('default', {
          month: 'long',
        }),
        balance: await this.abbreviateNumber(totalBalance / 100),
        current: month === now.getMonth() ? true : false,
        difference: difference,
      };
      Balances.push(monthbalance);
    }
    return Balances;
  }

  async abbreviateNumber(number: number): Promise<any> {
    const suffixes = ['', 'k', 'M', 'B', 'T'];
    let suffixIndex = 0;

    while (number >= 1000 && suffixIndex < suffixes.length - 1) {
      number /= 1000;
      suffixIndex++;
    }

    let formattedNumber = number.toFixed(1) as any;
    if (formattedNumber % 1 === 0) {
      formattedNumber = parseInt(formattedNumber);
    }
    formattedNumber += suffixes[suffixIndex];

    return formattedNumber;
  }

  async get_budget(user: User, body: any): Promise<any> {
    const balance = await this.stripe.balance.retrieve();
    const total_budget = await this.total_budget();
    const availableBalance = balance.available[0].amount;
    const total_customers = await this.usersService.count_customers();
    const total_orders = await this.ordersService.count_orders();
    return {
      total_budget: total_budget,
      total_profit: await this.abbreviateNumber(availableBalance / 100),
      total_customers: {
        total: await this.abbreviateNumber(total_customers.total),
        difference: total_customers.difference,
      },
      total_orders: {
        total: await this.abbreviateNumber(total_orders.total),
        difference: total_orders.difference,
      },
    };
  }

  async get_traffic(user: User, body: any): Promise<any> {
    const total_agents = await this.useragentService.count_agents();
    const total_budget = await this.total_budget();
    return {
      total_agents: total_agents,
      total_budget: total_budget,
    };
  }

  async get_orders(user: User, body: any): Promise<any> {
    const total_orders = await this.ordersService.get_orders();
    return total_orders;
  }

  async get_customers(user: User, body: any): Promise<any> {
    const total_customers = await this.usersService.get_customers();
    return total_customers;
  }
}
