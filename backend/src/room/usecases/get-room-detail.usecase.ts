import { Injectable } from '@nestjs/common';
import {
  RoomRepository,
  RoomWithMembers,
} from '../repositories/room.repository';

@Injectable()
export class GetRoomDetailUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(roomId: string): Promise<RoomWithMembers | null> {
    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new Error('ルームが見つかりません');
    }
    return room;
  }
}
