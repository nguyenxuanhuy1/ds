import { ApiProperty } from "@nestjs/swagger";

export class CreateMenuDto {
    @ApiProperty()
    icon: string;

    @ApiProperty()
    text: string;

    @ApiProperty()
    href: string;
}
