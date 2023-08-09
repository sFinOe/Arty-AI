import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBillingDto } from './create-billing.dto';
import { CreateShippingDto } from './create-shipping.dto';
import { CreateProductDto } from './create-product.dto';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  subtotal: number;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsString()
  @IsNotEmpty()
  shippingType: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsString()
  @IsNotEmpty()
  confirmationNumber: string;

  @Type(() => CreateBillingDto)
  @Validate(CreateBillingDto)
  billing: CreateBillingDto;

  @Type(() => CreateShippingDto)
  @Validate(CreateShippingDto)
  shipping: CreateShippingDto;

  @Type(() => CreateProductDto)
  @Validate(CreateProductDto)
  product: CreateProductDto;
}
