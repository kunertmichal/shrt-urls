import { IsUrl } from 'class-validator';

export class SaveUrlDto {
  @IsUrl()
  url: string;
}
