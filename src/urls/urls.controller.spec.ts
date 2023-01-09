import { Test } from '@nestjs/testing';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import exp from 'constants';

describe('UrlsController', () => {
  let urlsController: UrlsController;
  let urlsService: UrlsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UrlsController],
      providers: [
        {
          provide: UrlsService,
          useValue: {
            save() {
              return;
            },
            findOneAndRefreshTtl() {
              return;
            },
          },
        },
      ],
    }).compile();

    urlsController = module.get<UrlsController>(UrlsController);
    urlsService = module.get<UrlsService>(UrlsService);
  });

  describe('saveUrl', () => {
    it('should return key of saved url', async () => {
      jest
        .spyOn(urlsService, 'save')
        .mockImplementation(async () => ({ shortUrlKey: 'abc123' }));

      const result = await urlsController.saveUrl({
        url: 'https://google.com',
      });
      expect(result).toStrictEqual({ shortUrlKey: 'abc123' });
      expect(urlsService.save).toHaveBeenCalledWith({
        url: 'https://google.com',
      });
      expect(urlsService.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneAndRefreshTtl', () => {
    it('should return url of given key', async () => {
      jest
        .spyOn(urlsService, 'findOneAndRefreshTtl')
        .mockImplementation(async () => ({ longUrl: 'https://google.com' }));

      const result = await urlsController.findLongUrl('abc123');
      expect(result).toStrictEqual({ longUrl: 'https://google.com' });
      expect(urlsService.findOneAndRefreshTtl).toHaveBeenCalledWith('abc123');
      expect(urlsService.findOneAndRefreshTtl).toHaveBeenCalledTimes(1);
    });
  });
});
