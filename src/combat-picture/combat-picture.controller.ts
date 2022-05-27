import {
  BadRequestException,
  Controller,
  Get,
  Header,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CombatPictureService } from './combat-picture.service';

@Controller()
export class CombatPictureController {
  constructor(private combatPictureService: CombatPictureService) {}

  @Get()
  @Header('Content-Type', 'image/jpeg')
  async generate(@Query('url') url: string, @Res() res: Response) {
    const imageWithBubble = await this.combatPictureService.getFacesFromUrl(
      url,
    );
    imageWithBubble.pipe(res);
    try {
      const imageWithBubble = await this.combatPictureService.getFacesFromUrl(
        url,
      );
      imageWithBubble.pipe(res);
    } catch (e) {
      res.setHeader('Content-Type', 'application/json');
      throw new BadRequestException('Задай нормальный URL');
    }
  }
}
