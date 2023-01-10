import { Test } from '@nestjs/testing';
import { UrlsStorage } from './urls.storage';
import { ConfigService } from '@nestjs/config';

describe('UrlsStorage', () => {
  let urlsStorage: UrlsStorage;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UrlsStorage, ConfigService],
    }).compile();

    urlsStorage = module.get<UrlsStorage>(UrlsStorage);
  });

  describe('onApplicationBootstrap', () => {
    it('should be defined', () => {
      expect(urlsStorage.onApplicationBootstrap).toBeDefined();
    });
  });

  describe('onApplicationShutdown', () => {
    it('should be defined', () => {
      expect(urlsStorage.onApplicationShutdown).toBeDefined();
    });
  });
});
