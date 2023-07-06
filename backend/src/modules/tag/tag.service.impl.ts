import { CompleteTagRequest, CreateTagRequest } from 'src/dtos/tag.dto';
import { TagService } from './tag.service';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ProcessingTagSortType } from 'src/types/tag.types';
import deleteImage from 'src/functions/deleteImage';
import ICoordinate from 'src/interfaces/ICoordinate';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagServiceImpl implements TagService {
  private readonly logger = new Logger(TagServiceImpl.name);

  constructor(private readonly prisma: PrismaService) {}

  async completeTag(
    tagID: string,
    request: CompleteTagRequest,
    filename: string,
  ) {
    this.logger.log('Completing a tag');

    try {
      const currentTag = await this.retrieveProcessingTag(tagID);
      const coordinates: ICoordinate[] = [];

      if (request.coordinates === undefined) {
        this.logger.warn('No labels provided when completing a tag');
        throw new HttpException({ message: 'No labels provided' }, 400);
      }

      for (let i = 0; i < request.coordinates.length; i++) {
        coordinates.push({
          width: Number(request.coordinates[i].width),
          height: Number(request.coordinates[i].height),
          x: Number(request.coordinates[i].x),
          y: Number(request.coordinates[i].y),
          label: request.coordinates[i].label,
        });
      }

      const completedTag = await this.prisma.completedTag.create({
        data: {
          imageURL: filename,
          message: request.message,
          coordinates: {
            createMany: {
              data: coordinates,
            },
          },
        },
      });

      this.logger.log('Tag completed');

      deleteImage(currentTag.imageURL);
      await this.prisma.tag.delete({ where: { id: currentTag.id } });
      return completedTag;
    } catch (error) {
      this.logger.warn(
        `Something went wrong when completing a tag - ${error.message}`,
      );
      deleteImage(filename);

      throw new HttpException({ message: error.message }, 400);
    }
  }

  getProcessingTagByID(tagID: string) {
    return this.retrieveProcessingTag(tagID);
  }

  async deleteProcessingTagByID(tagID: string) {
    this.logger.log(`Deleting processing tag with id (${tagID})`);

    const tag = await this.retrieveProcessingTag(tagID);

    deleteImage(tag.imageURL);
    await this.prisma.tag.delete({ where: { id: tag.id } });

    this.logger.log(`Processing tag with id (${tagID}) deleted`);
    return { message: 'Tag deleted' };
  }

  async getAllProcessingTags(sortedBy?: ProcessingTagSortType) {
    this.logger.log(
      `Fetching all processing tags with sortBy option (${sortedBy})`,
    );

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
    this.logger.log('Fetching all processed tags');

    return await this.prisma.completedTag.findMany({
      include: {
        coordinates: {
          select: {
            x: true,
            y: true,
            width: true,
            height: true,
            label: true,
          },
        },
      },
    });
  }

  async createTag(
    { instructions, objectsToAnnotate, urgency }: CreateTagRequest,
    filename: string,
  ) {
    this.logger.log('Creating a tag');
    try {
      return await this.prisma.tag.create({
        data: {
          urgency,
          instructions,
          imageURL: filename,
          objectsToAnnotate,
          withLabels: objectsToAnnotate !== undefined,
        },
      });
    } catch (error) {
      deleteImage(filename);

      this.logger.warn(
        `Something went wrong when creating a tag - ${error.message}`,
      );
      throw new HttpException({ message: error.message }, 400);
    }
  }

  private async retrieveProcessingTag(tagID: string) {
    this.logger.log(`Fetching processing tag with id (${tagID})`);

    const processingTag = await this.prisma.tag.findUnique({
      where: { id: tagID },
    });

    if (processingTag === null) {
      this.logger.warn(`Tag with provided id (${tagID}) could not be found`);

      throw new HttpException(
        `Could not find tag with provided id (${tagID})`,
        404,
      );
    }

    return processingTag;
  }
}
