import { Injectable } from '@nestjs/common';
import {
  RoomMemberRepository,
  RoomMember,
} from '../repositories/room-member.repository';

@Injectable()
export class JoinRoomUseCase {
  constructor(private readonly roomMemberRepository: RoomMemberRepository) {}

  async execute(roomId: string, userId: string): Promise<RoomMember> {
    // 既に参加しているかチェック
    const existing = await this.roomMemberRepository.findOne(roomId, userId);
    if (existing && existing.isActive) {
      throw new Error('既にこのルームに参加しています');
    }

    // メンバーとして追加（自分で参加なのでinvitedByはなし）
    return await this.roomMemberRepository.addMember({
      roomId,
      userId,
      role: 'MEMBER',
    });
  }
}
