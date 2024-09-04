import { ApiProperty } from "@nestjs/swagger";

export class CreateKeywordDto {
    
    @ApiProperty()
    text: string;

    @ApiProperty()
    href: string;
}
