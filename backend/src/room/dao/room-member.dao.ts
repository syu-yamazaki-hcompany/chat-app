import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  RoomMemberRepository,
  RoomMember,
  AddMemberData,
} from '../repositories/room-member.repository';

@Injectable()
export class RoomMemberDao extends RoomMemberRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async addMember(input: AddMemberData): Promise<RoomMember> {
    return await this.prisma.roomMember.upsert({
      where: {
        roomId_userId: {
          roomId: input.roomId,
          userId: input.userId,
        },
      },
      update: {
        isActive: true,
        role: input.role,
        invitedBy: input.invitedBy,
      },
      create: {
        roomId: input.roomId,
        userId: input.userId,
        role: input.role,
        invitedBy: input.invitedBy,
      },
      include: {
        user: true,
        inviter: true,
      },
    });
  }

  async removeMember(roomId: string, userId: string): Promise<void> {
    await this.prisma.roomMember.update({
      where: {
        roomId_userId: { roomId, userId },
      },
      data: {
        isActive: false,
      },
    });
  }

  async findByRoomId(roomId: string): Promise<RoomMember[]> {
    return await this.prisma.roomMember.findMany({
      where: {
        roomId,
        isActive: true,
      },
      include: {
        user: true,
        inviter: true,
      },
    });
  }

  async findByUserId(userId: string): Promise<RoomMember[]> {
    return await this.prisma.roomMember.findMany({
      where: {
        userId,
        isActive: true,
      },
      include: {
        user: true,
        inviter: true,
      },
    });
  }

  async findOne(roomId: string, userId: string): Promise<RoomMember | null> {
    return await this.prisma.roomMember.findUnique({
      where: {
        roomId_userId: { roomId, userId },
      },
      include: {
        user: true,
        inviter: true,
      },
    });
  }
}
