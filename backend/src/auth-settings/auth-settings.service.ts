import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthSettingsService {
	  constructor(
	private usersService: UsersService,
  ) {}

  async getsettings(user: User): Promise<User> {
	return this.usersService.findOne({
		id: user.id,
	  });
  }

  async changePassword(user: User, body: any): Promise<User> {
	const { oldPassword, newPassword } = body;
	const userEntity = await this.usersService.findOne({
		id: user.id,
	});
	if (userEntity) {
		const isValidPassword = await bcrypt.compare(
			oldPassword,
			userEntity.password,
		);
		if (isValidPassword) {
			userEntity.password = newPassword;
			return this.usersService.update(userEntity.id, userEntity);
		} else {
			throw new HttpException(
				{
					status: HttpStatus.UNPROCESSABLE_ENTITY,
					errors: {
						oldPassword: 'invalid',
					},
				},
				HttpStatus.UNPROCESSABLE_ENTITY,
			);
		}
	} else {
		throw new HttpException(
			{
				status: HttpStatus.UNPROCESSABLE_ENTITY,
				errors: {
					email: 'notFound',
				},
			},
			HttpStatus.UNPROCESSABLE_ENTITY,
		);
	}
}

async changeSettings(user: User, body: any): Promise<User> {
	const { firstName, lastName, phone, photoUrl } = body;
	const userEntity = await this.usersService.findOne({
		id: user.id,
	});
	if (userEntity) {
		userEntity.firstName = firstName;
		userEntity.lastName = lastName;
		userEntity.phone = phone;
		userEntity.photoUrl = photoUrl;
		return this.usersService.update(userEntity.id, userEntity);
	} else {
		throw new HttpException(
			{
				status: HttpStatus.UNPROCESSABLE_ENTITY,
				errors: {
					email: 'notFound',
				},
			},
			HttpStatus.UNPROCESSABLE_ENTITY,
		);
	}
}

}