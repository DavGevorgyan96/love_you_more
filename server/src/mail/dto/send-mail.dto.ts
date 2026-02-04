import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class SendMailDto {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  subject: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  text: string;

  @IsString()
  @IsOptional()
  html?: string;
}
