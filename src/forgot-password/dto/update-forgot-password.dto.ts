import { PartialType } from '@nestjs/mapped-types';
import { CreateForgotPasswordDto } from './create-forgot-password.dto';

export class UpdateForgotPasswordDto {
  password: string;
}
