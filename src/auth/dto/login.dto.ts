import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ example: 'username' })
  username: string;
  @ApiProperty({ example: 'password' })
  password: string;
}
