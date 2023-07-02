import { Module } from '@nestjs/common';

import { GlobalExceptionFilter } from './filters/globalException.filter';

@Module({
  imports: [],
  controllers: [],
  providers: [GlobalExceptionFilter],
})
export class AppModule {}
