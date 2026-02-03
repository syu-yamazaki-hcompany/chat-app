export type Room = {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Date;
};

export interface CreateRoomData {
  name: string;
  createdBy: string;
}

export abstract class RoomRepository {
  abstract createRoom(input: CreateRoomData): Promise<Room>;
}
