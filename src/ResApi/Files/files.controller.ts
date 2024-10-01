import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileUploadService } from './files.service';

@ApiTags('Api-Files')
@Controller('files')
export class FilesController {
  constructor(private readonly fileUploadService: FileUploadService) {}
}
