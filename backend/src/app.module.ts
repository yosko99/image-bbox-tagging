import { Module } from '@nestjs/common';

import { GlobalExceptionFilter } from './filters/globalException.filter';
import { TagModule } from './modules/tag/tag.module';

@Module({
  imports: [TagModule],
  controllers: [],
  providers: [GlobalExceptionFilter],
})
export class AppModule {}
