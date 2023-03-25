import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MySQLService } from '../persistence/mysql.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RtStrategy, AtStrategy } from './strategies';

@Module({
  imports:[JwtModule.register({
    
  })],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, MySQLService]
})
export class AuthModule {}
