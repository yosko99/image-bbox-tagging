import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Inject,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { ProcessingTagSortType } from 'src/types/tag.types';
import { multerFilter } from 'src/config/multerConfig';
import { CompleteTagRequest, CreateTagRequest } from 'src/dtos/tag.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/tags')
@ApiTags('Tags')
export class TagController {
  constructor(@Inject(TagService) private readonly tagService: TagService) {}

  @Get('/processing')
  getProcessingTags(@Query('sort') sortType: ProcessingTagSortType) {
    return this.tagService.getAllProcessingTags(sortType);
  }

  @Get('/processed')
  getProcessedTags() {
    return this.tagService.getAllProcessedTags();
  }

  @Get('/processing/:id')
  getProcessingTagByID(@Param('id') id: string) {
    return this.tagService.getProcessingTagByID(id);
  }

  @Delete('/processing/:id')
  deleteProcessingTagByID(@Param('id') id: string) {
    return this.tagService.deleteProcessingTagByID(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image', multerFilter))
  createTag(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
    @Body()
    request: CreateTagRequest,
  ) {
    return this.tagService.createTag(request, file.filename);
  }

  @Post('/complete/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image', multerFilter))
  completeTag(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
    @Body()
    request: CompleteTagRequest,
    @Param('id') id: string,
  ) {
    return this.tagService.completeTag(id, request, file.filename);
  }
}
