import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  RoomRepository,
  CreateRoomData,
  Room,
} from '../repositories/room.repository';

@Injectable()
export class RoomDao extends RoomRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async createRoom(input: CreateRoomData): Promise<Room> {
    return await this.prisma.room.create({
      data: {
        name: input.name,
        createdBy: input.createdBy,
        roomMembers: {
          create: {
            userId: input.createdBy,
            role: 'ADMIN',
          },
        },
      },
    });
  }
}
