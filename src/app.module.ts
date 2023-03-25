import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PruebitaModule } from './pruebita/pruebita.module';

@Module({
  imports: [AuthModule, PruebitaModule],
})
export class AppModule {}
