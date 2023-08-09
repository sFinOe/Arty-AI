import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { RoleEnum } from 'src/roles/roles.enum';
import { Role } from 'src/roles/entities/role.entity';
import { AuthRegisterLoginDto } from 'src/auth/dto/auth-register-login.dto';
import { Status } from 'src/statuses/entities/status.entity';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GuestAuthService {
  constructor(
    private usersService: UsersService,
    private jwtservice: JwtService,
  ) {}

  async login(body: any): Promise<{ token: string; user: User }> {
    const { email, password, firstName, lastName } = body;
    const Cryptpassword = await bcrypt.hash(password, 10);
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');
    const user = await this.usersService.create({
      firstName,
      lastName,
      email,
      password: Cryptpassword,
      role: {
        id: RoleEnum.guest,
        name: 'Guest',
      } as Role,
      status: {
        id: StatusEnum.active,
      } as Status,
      hash,
    });

    const token = await this.jwtservice.sign({ id: user.id, role: user.role });

    return { token, user };
  }
}
