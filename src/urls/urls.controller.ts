import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SaveUrlDto } from './dto/create-short-url-dto/save-url-dto';
import { UrlsService } from './urls.service';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  saveUrl(@Body() saveUrlDto: SaveUrlDto) {
    return this.urlsService.save(saveUrlDto);
  }

  @Get(':id')
  findOneAndRedirect(@Param('id') id: string) {
    return this.urlsService.findOne(id);
  }
}
