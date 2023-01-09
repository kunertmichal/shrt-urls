import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UrlsModule } from './urls/urls.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.local', '.env'],
    }),
    UrlsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
