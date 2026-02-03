import { Module } from '@nestjs/common';
import { RoomResolver } from './resolvers/room.resolver';
import { CreateRoomUseCase } from './usecases/create-room.usecase';
import { JoinRoomUseCase } from './usecases/join-room.usecase';
import { RoomDao } from './dao/room.dao';
import { RoomMemberDao } from './dao/room-member.dao';
import { RoomRepository } from './repositories/room.repository';
import { RoomMemberRepository } from './repositories/room-member.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { LeaveRoomUseCase } from './usecases/leave-room.usecase';
import { InviteToRoomUseCase } from './usecases/invite-to-room.usecase';

@Module({
  imports: [PrismaModule],
  providers: [
    // Resolver
    RoomResolver,

    // UseCases
    CreateRoomUseCase,
    JoinRoomUseCase,
    LeaveRoomUseCase,
    InviteToRoomUseCase,

    // Repositories
    {
      provide: RoomRepository,
      useClass: RoomDao,
    },
    {
      provide: RoomMemberRepository,
      useClass: RoomMemberDao,
    },
  ],
})
export class RoomModule {}
