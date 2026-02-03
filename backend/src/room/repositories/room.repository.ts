export type Room = {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Date;
};

export type RoomMemberInRoom = {
  roomId: string;
  userId: string;
  role: string;
  joinedAt: Date;
  invitedBy: string | null;
  user: {
    id: string;
    name?: string;
  };
};

export type RoomWithMembers = Room & {
  roomMembers: RoomMemberInRoom[];
};

export interface CreateRoomData {
  name: string;
  createdBy: string;
}

export abstract class RoomRepository {
  abstract createRoom(input: CreateRoomData): Promise<Room>;
  abstract findJoinedRooms(userId: string): Promise<RoomWithMembers[]>;
}
