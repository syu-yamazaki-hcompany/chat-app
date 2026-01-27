import { Injectable } from '@nestjs/common';
import {
  RoomRepository,
  RoomWithMembers,
} from '../repositories/room.repository';

@Injectable()
export class GetJoinedRoomsUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(userId: string): Promise<RoomWithMembers[]> {
    return await this.roomRepository.findJoinedRooms(userId);
  }
}
