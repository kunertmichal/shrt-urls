import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { UrlsStorage } from './urls.storage';

@Module({
  controllers: [UrlsController],
  providers: [UrlsService, UrlsStorage],
})
export class UrlsModule {}
