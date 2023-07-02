import { CompleteTagRequest, CreateTagRequest } from 'src/dtos/tag.dto';
import { TagService } from './tag.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpException, Injectable } from '@nestjs/common';
import { ProcessingTagSortType } from 'src/types/tag.types';
import deleteImage from 'src/functions/deleteImage';
import ICoordinate from 'src/interfaces/ICoordinate';

@Injectable()
export class TagServiceImpl implements TagService {
  constructor(private readonly prisma: PrismaService) {}

  async completeTag(
    tagID: string,
    request: CompleteTagRequest,
    filename: string,
  ) {
    try {
      const currentTag = await this.retrieveProcessingTag(tagID);
      const coordinates: ICoordinate[] = [];

      for (let i = 0; i < request.coordinates.length; i++) {
        coordinates.push({
          width: Number(request.coordinates[i].width),
          height: Number(request.coordinates[i].height),
          x: Number(request.coordinates[i].x),
          y: Number(request.coordinates[i].y),
          label: request.coordinates[i].label && '',
        });
      }

      const completedTag = await this.prisma.completedTag.create({
        data: {
          imageURL: filename,
          message: request.message,
          coordinates: {
            createMany: { data: coordinates },
          },
        },
      });

      deleteImage(currentTag.imageURL);
      await this.prisma.tag.delete({ where: { id: currentTag.id } });

      return completedTag;
    } catch (error) {
      deleteImage(filename);

      throw new HttpException({ message: error.message }, 400);
    }
  }

  getProcessingTagByID(tagID: string) {
    return this.retrieveProcessingTag(tagID);
  }

  async deleteProcessingTagByID(tagID: string) {
    const tag = await this.retrieveProcessingTag(tagID);

    deleteImage(tag.imageURL);
    await this.prisma.tag.delete({ where: { id: tag.id } });

    return { message: 'Tag deleted' };
  }

  async getAllProcessingTags(sortedBy?: ProcessingTagSortType) {
    switch (sortedBy) {
      case 'date':
        return await this.prisma.tag.findMany({
          orderBy: { createdAt: 'desc' },
        });
      case 'urgency':
        return await this.prisma.tag.findMany({
          orderBy: { urgency: 'desc' },
        });
      default:
        return await this.prisma.tag.findMany({});
    }
  }

  async getAllProcessedTags() {
    return await this.prisma.completedTag.findMany({});
  }

  async createTag(
    { instructions, objectsToAnnotate, urgency }: CreateTagRequest,
    filename: string,
  ) {
    try {
      return await this.prisma.tag.create({
        data: {
          urgency,
          instructions,
          imageURL: filename,
          objectsToAnnotate,
          withLabels: objectsToAnnotate.length !== 0,
        },
      });
    } catch (error) {
      deleteImage(filename);

      throw new HttpException({ message: error.message }, 400);
    }
  }

  private async retrieveProcessingTag(tagID: string) {
    const processingTag = await this.prisma.tag.findUnique({
      where: { id: tagID },
    });

    if (processingTag === null) {
      throw new HttpException(
        `Could not find tag with provided id (${tagID})`,
        404,
      );
    }

    return processingTag;
  }
}
