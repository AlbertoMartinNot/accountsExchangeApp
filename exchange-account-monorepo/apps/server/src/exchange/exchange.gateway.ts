import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080,{cors:true})
export class ExchangeGateway implements OnGatewayConnection {

  @WebSocketServer() server: Server;

  handleConnection(socket) {
    socket.on('triggerExchange', (data) => {
       const randomExchangeValue = Math.floor(Math.random() * (12000 - 6000 + 1)) + 6000;
        this.server.emit('updateExchange', randomExchangeValue)
    });
    socket.on('triggerBalance', (data) => {
      const randomBalanceModifier = Math.floor(Math.random() * (1.6 - 0.5 + 1)) + 0.5;
       this.server.emit('updateBalance', randomBalanceModifier)
   });
  }
}


