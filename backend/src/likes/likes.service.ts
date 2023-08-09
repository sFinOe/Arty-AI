import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LikesService {
  constructor(private usersService: UsersService) {}

  async add_like(user: User, body: any): Promise<User> {
    const { LikedImg } = body;
    const userEntity = await this.usersService.findOne({
      id: user.id,
    });

    if (userEntity) {
      userEntity.likes.push(LikedImg);
      return this.usersService.update(userEntity.id, userEntity);
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

  async likes(user: User, body: any): Promise<any> {
    const userEntity = await this.usersService.findOne({
      id: user.id,
    });

    if (userEntity) {
      return userEntity.likes;
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

  async DeleteUser(user: User, body: any): Promise<any> {
    const { id } = body;
    const userEntity = await this.usersService.softDelete(id);
  }
}
