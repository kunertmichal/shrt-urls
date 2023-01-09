import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlsStorage } from './urls.storage';
import { SaveUrlDto } from './dto/create-short-url-dto/save-url-dto';

@Injectable()
export class UrlsService {
  constructor(private readonly urlsStorage: UrlsStorage) {}

  async save(saveUrlDto: SaveUrlDto) {
    try {
      return {
        shortUrlKey: await this.urlsStorage.insert(saveUrlDto),
      };
    } catch {
      throw new Error('Unable to save the url');
    }
  }

  async findOneAndRefreshTtl(id: string): Promise<{ longUrl: string }> {
    const found = await this.urlsStorage.findOneAndRefreshTtl(id);
    if (!found) {
      throw new NotFoundException('Url not found');
    }
    return { longUrl: found };
  }
}
