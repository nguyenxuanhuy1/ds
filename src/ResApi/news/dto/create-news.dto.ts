import { ApiProperty } from "@nestjs/swagger";

export class CreateNewsDto {
    @ApiProperty()
    icon: string;

    @ApiProperty()
    text: string;

    @ApiProperty()
    href: string;
}
