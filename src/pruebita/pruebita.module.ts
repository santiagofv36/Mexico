import { Module } from '@nestjs/common';
import { PruebitaService } from './pruebita.service';
import { PruebitaController } from './pruebita.controller';

@Module({
  providers: [PruebitaService],
  controllers: [PruebitaController]
})
export class PruebitaModule {}
