import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeGateway } from '../exchange/exchange.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,ExchangeGateway],
})
export class AppModule {}
