import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';

@Controller('/tags')
@ApiTags('Tags')
export class TagController {
  constructor(@Inject(TagService) private readonly tagService: TagService) {}
}
