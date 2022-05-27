import { Module } from '@nestjs/common';
import { CombatPictureModule } from './combat-picture/combat-picture.module';

@Module({
  imports: [CombatPictureModule],
  providers: [],
})
export class AppModule {}
