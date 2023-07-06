import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TagController } from './tag.controller';

import { TagService } from './tag.service';

import { TagServiceImpl } from './tag.service.impl';

import { CheckIfUploadsFolderExists } from 'src/middleware/utils/checkIfUploadsFolderExists.middleware';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [TagController],
  providers: [{ provide: TagService, useClass: TagServiceImpl }, PrismaService],
})
export class TagModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIfUploadsFolderExists).forRoutes({
      path: '/tags',
      method: RequestMethod.POST,
    });

    consumer.apply(CheckIfUploadsFolderExists).forRoutes({
      path: '/tags/complete',
      method: RequestMethod.POST,
    });
  }
}
