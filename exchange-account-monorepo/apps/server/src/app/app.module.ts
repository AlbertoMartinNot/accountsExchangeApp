import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeGateway } from '../exchange/exchange.gateway';
import { AccountsService } from '../accounts/accounts.service';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [AccountsModule],
  controllers: [AppController],
  providers: [AppService,ExchangeGateway,AccountsService],
})
export class AppModule {}
