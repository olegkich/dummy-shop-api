import { IsEmail, IsString, Length } from 'class-validator';

export class UserDto {
  @IsString({ message: 'should be a string' })
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;

  @IsString({ message: 'should be a string' })
  @Length(4, 16, {
    message:
      'the passwords length should is 4 symbols minimum and 16 symbols maximum.',
  })
  password: string;

  role: string;

  id?: string;
}
