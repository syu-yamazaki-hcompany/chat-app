import { Injectable } from '@nestjs/common';
import {
  RoomMemberRepository,
  RoomMember,
} from '../repositories/room-member.repository';

@Injectable()
export class InviteToRoomUseCase {
  constructor(private readonly roomMemberRepository: RoomMemberRepository) {}

  async execute(
    roomId: string,
    targetUserId: string,
    inviterId: string,
  ): Promise<RoomMember> {
    // 既に参加しているかチェック
    const existing = await this.roomMemberRepository.findOne(
      roomId,
      targetUserId,
    );
    if (existing) {
      throw new Error('このユーザーは既にルームに参加しています');
    }

    // 招待者がルームに参加しているかチェック
    const inviterMember = await this.roomMemberRepository.findOne(
      roomId,
      inviterId,
    );
    if (!inviterMember) {
      throw new Error('あなたはこのルームに参加していません');
    }

    // メンバーとして追加（招待）
    return await this.roomMemberRepository.addMember({
      roomId,
      userId: targetUserId,
      role: 'MEMBER',
      invitedBy: inviterId,
    });
  }
}
