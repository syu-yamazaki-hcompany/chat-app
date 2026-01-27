import { Module } from '@nestjs/common';
import { RoomResolver } from './resolvers/room.resolver';
import { CreateRoomUseCase } from './usecases/create-room.usecase';
import { RoomDao } from './dao/room.dao';
import { RoomRepository } from './repositories/room.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    RoomResolver,
    CreateRoomUseCase,
    {
      provide: RoomRepository,
      useClass: RoomDao,
    },
  ],
})
export class RoomModule {}
