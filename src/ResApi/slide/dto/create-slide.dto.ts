import { ApiProperty } from "@nestjs/swagger";

export class CreateSlideDto {

    @ApiProperty()
    image: string;

    @ApiProperty()
    href: string;
    
}
