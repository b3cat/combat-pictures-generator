import { HttpModule } from '@nestjs/axios';
import { Module, OnModuleInit } from '@nestjs/common';
import { CombatPictureService } from './combat-picture.service';
import { CombatPictureController } from './combat-picture.controller';
import * as path from 'path';

@Module({
  imports: [HttpModule],
  providers: [CombatPictureService],
  controllers: [CombatPictureController],
})
export class CombatPictureModule implements OnModuleInit {
  async onModuleInit() {
    const canvas = await import('canvas');
    const faceapi = await import('face-api.js');

    const { Canvas, Image, ImageData } = canvas;
    // @ts-expect-error canvas doesn't perfectly implement type
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    await faceapi.nets.faceLandmark68Net.loadFromDisk(
      path.resolve(process.cwd(), 'models/'),
    );
  }
}
