import { Test } from '@nestjs/testing';
import { UrlsService } from './urls.service';
import { UrlsStorage } from './urls.storage';

describe('UrlsController', () => {
  let urlsService: UrlsService;
  let urlsStorage: UrlsStorage;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UrlsService,
        {
          provide: UrlsStorage,
          useValue: {
            insert() {
              return;
            },
            findOneAndRefreshTtl() {
              return;
            },
          },
        },
      ],
    }).compile();

    urlsService = module.get<UrlsService>(UrlsService);
    urlsStorage = module.get<UrlsStorage>(UrlsStorage);
  });

  describe('save', () => {
    it('should return key of saved url', async () => {
      jest
        .spyOn(urlsStorage, 'insert')
        .mockImplementation(async () => 'abc123');

      const result = await urlsService.save({
        url: 'https://google.com',
      });
      expect(result).toStrictEqual({ shortUrlKey: 'abc123' });
      expect(urlsStorage.insert).toHaveBeenCalledWith({
        url: 'https://google.com',
      });
      expect(urlsStorage.insert).toHaveBeenCalledTimes(1);
    });

    it('should throw error with appropriate message when unable to save url', async () => {
      jest.spyOn(urlsStorage, 'insert').mockImplementation(async () => {
        throw new Error('Unable to save the url');
      });

      await expect(
        urlsService.save({
          url: 'https://google.com',
        }),
      ).rejects.toThrowError('Unable to save the url');
    });
  });

  describe('findOneAndRefreshTtl', () => {
    it('returns long url for given key', async () => {
      jest
        .spyOn(urlsStorage, 'findOneAndRefreshTtl')
        .mockImplementation(async () => 'https://google.com');

      const result = await urlsService.findOneAndRefreshTtl('abc123');
      expect(result).toStrictEqual({ longUrl: 'https://google.com' });
      expect(urlsStorage.findOneAndRefreshTtl).toHaveBeenCalledWith('abc123');
      expect(urlsStorage.findOneAndRefreshTtl).toHaveBeenCalledTimes(1);
    });

    it('throws error if url not found', async () => {
      jest
        .spyOn(urlsStorage, 'findOneAndRefreshTtl')
        .mockImplementation(async () => null);

      await expect(urlsService.findOneAndRefreshTtl('abc123')).rejects.toThrow(
        'Url not found',
      );
      expect(urlsStorage.findOneAndRefreshTtl).toHaveBeenCalledWith;
    });
  });
});
