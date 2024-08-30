import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    userName: string;

    @ApiProperty()
    passWord: string;
    
    @ApiProperty()
    conFirmPassWord: string;

    @ApiProperty()
    gmail: string;
}
