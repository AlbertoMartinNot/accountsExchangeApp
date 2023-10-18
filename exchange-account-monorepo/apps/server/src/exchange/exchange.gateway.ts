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
    socket.on('msgToServer', (data) => {
       const randomExchangeValue = Math.floor(Math.random() * (12000 - 6000 + 1)) + 6000;
        this.server.emit('msgToClient', randomExchangeValue)
    });
  }
}


