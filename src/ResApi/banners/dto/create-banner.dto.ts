import { ApiProperty } from "@nestjs/swagger";

export class CreateBannerDto {
        
    @ApiProperty()
    image: string;

    @ApiProperty()
    href: string;

    @ApiProperty({ required: false })
    openInNewTab?:boolean;
}
