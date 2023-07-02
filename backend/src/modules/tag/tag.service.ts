import { CreateTagRequest } from 'src/dtos/tag.dto';

export interface TagService {
  getProcessingTagByID(tagID: number);

  deleteProcessingTagByID(tagID: number);

  getAllProcessingTags(sortedBy?: string);

  getAllProcessedTags();

  createTag(request: CreateTagRequest);
}

export const TagService = Symbol('TagService');
