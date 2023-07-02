import { CreateTagRequest } from 'src/dtos/tag.dto';
import { TagService } from './tag.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagServiceImpl implements TagService {
  constructor(private readonly prisma: PrismaService) {}

  getProcessingTagByID(tagID: number) {
    throw new Error('Method not implemented.');
  }
  deleteProcessingTagByID(tagID: number) {
    throw new Error('Method not implemented.');
  }
  getAllProcessingTags(sortedBy?: string) {
    throw new Error('Method not implemented.');
  }
  getAllProcessedTags() {
    throw new Error('Method not implemented.');
  }
  createTag(request: CreateTagRequest) {
    throw new Error('Method not implemented.');
  }
}
