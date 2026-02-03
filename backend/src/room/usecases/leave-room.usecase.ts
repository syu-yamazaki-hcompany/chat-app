import { Injectable } from '@nestjs/common';
import { RoomMemberRepository } from '../repositories/room-member.repository';

@Injectable()
export class LeaveRoomUseCase {
  constructor(private readonly roomMemberRepository: RoomMemberRepository) {}

  async execute(roomId: string, userId: string): Promise<boolean> {
    // 参加しているかチェック
    const existing = await this.roomMemberRepository.findOne(roomId, userId);
    if (!existing || !existing.isActive) {
      throw new Error('このルームに参加していません');
    }

    // メンバーから削除（論理削除）
    await this.roomMemberRepository.removeMember(roomId, userId);
    return true;
  }
}
