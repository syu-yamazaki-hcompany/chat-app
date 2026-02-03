export type RoomMember = {
  roomId: string;
  userId: string;
  role: string;
  joinedAt: Date;
  isActive: boolean;
  invitedBy: string | null;
  user?: {
    id: string;
    name: string;
  };
  inviter?: {
    id: string;
    name: string;
  } | null;
};

export interface AddMemberData {
  roomId: string;
  userId: string;
  role: 'ADMIN' | 'MEMBER';
  invitedBy?: string;
}

export abstract class RoomMemberRepository {
  abstract addMember(input: AddMemberData): Promise<RoomMember>;
  abstract removeMember(roomId: string, userId: string): Promise<void>;
  abstract findByRoomId(roomId: string): Promise<RoomMember[]>;
  abstract findByUserId(userId: string): Promise<RoomMember[]>;
  abstract findOne(roomId: string, userId: string): Promise<RoomMember | null>;
}
