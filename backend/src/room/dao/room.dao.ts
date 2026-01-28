import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  RoomRepository,
  CreateRoomData,
  Room,
  RoomWithMembers,
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

  async findJoinedRooms(userId: string): Promise<RoomWithMembers[]> {
    return await this.prisma.room.findMany({
      where: {
        roomMembers: {
          some: {
            userId,
            isActive: true,
          },
        },
      },
      include: {
        roomMembers: {
          where: {
            isActive: true,
          },
          include: {
            user: true,
          },
        },
      },
    });
  }
  async findUnjoinedRooms(userId: string): Promise<RoomWithMembers[]> {
    return await this.prisma.room.findMany({
      where: {
        roomMembers: {
          none: {
            userId,
            isActive: true,
          },
        },
      },
      include: {
        roomMembers: {
          where: {
            isActive: true,
          },
          include: {
            user: true,
          },
        },
      },
    });
  }
}
