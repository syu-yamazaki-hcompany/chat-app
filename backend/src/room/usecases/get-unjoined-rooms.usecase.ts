import { Injectable } from '@nestjs/common';
import {
  RoomRepository,
  RoomWithMembers,
} from '../repositories/room.repository';

@Injectable()
export class GetUnjoinedRoomsUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(userId: string): Promise<RoomWithMembers[]> {
    return await this.roomRepository.findUnjoinedRooms(userId);
  }
}
