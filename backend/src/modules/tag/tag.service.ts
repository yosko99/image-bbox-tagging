import { CompleteTagRequest, CreateTagRequest } from 'src/dtos/tag.dto';
import { ProcessingTagSortType } from 'src/types/tag.types';

export interface TagService {
  getProcessingTagByID(tagID: string);

  deleteProcessingTagByID(tagID: string);

  getAllProcessingTags(sortedBy?: ProcessingTagSortType);

  getAllProcessedTags();

  createTag(request: CreateTagRequest, filename: string);

  completeTag(tagID: string, request: CompleteTagRequest, filename: string);
}

export const TagService = Symbol('TagService');
