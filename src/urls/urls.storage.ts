import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import { SaveUrlDto } from './dto/create-short-url-dto/save-url-dto';

const URL_KEY_LENGTH = 6;
const URL_TTL = 60 * 60; // 1 hour

@Injectable()
export class UrlsStorage
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private redisClient: Redis;

  constructor(private readonly configService: ConfigService) {}

  onApplicationBootstrap() {
    this.redisClient = new Redis({
      host: this.configService.get('redisHost'),
      password: this.configService.get('redisPassword'),
      port: this.configService.get('redisPort'),
      username: this.configService.get('redisUsername'),
    });
  }

  onApplicationShutdown() {
    this.redisClient.quit();
  }

  async insert(saveUrlDto: SaveUrlDto) {
    const key = nanoid(URL_KEY_LENGTH);
    await this.redisClient.setex(this.getKey(key), URL_TTL, saveUrlDto.url);
    return key;
  }

  async findOneAndRefreshTtl(key: string): Promise<string> {
    return this.redisClient.getex(this.getKey(key), 'EX', URL_TTL);
  }

  private getKey(url: string) {
    return `url-${url}`;
  }
}
