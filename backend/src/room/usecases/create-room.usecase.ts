import { Injectable } from '@nestjs/common';
import {
  RoomRepository,
  CreateRoomData,
  Room,
} from '../repositories/room.repository';

@Injectable()
export class CreateRoomUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(input: CreateRoomData): Promise<Room> {
    return await this.roomRepository.createRoom(input);
  }
}
