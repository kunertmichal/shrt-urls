import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
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
  async findOneAndRedirect(@Param('id') id: string, @Res() res: Response) {
    const url = await this.urlsService.findOne(id);
    return res.redirect(HttpStatus.MOVED_PERMANENTLY, url);
  }
}
