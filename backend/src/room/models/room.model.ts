import { ObjectType, Field, ID } from '@nestjs/graphql';
import { RoomMemberModel } from './room-member.model';

@ObjectType()
export class RoomModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  createdBy: string;

  @Field()
  createdAt: Date;

  @Field(() => [RoomMemberModel], { nullable: true })
  roomMembers?: RoomMemberModel[];
}
