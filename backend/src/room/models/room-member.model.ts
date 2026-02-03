import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserModel } from '../../user/models/user.model';

@ObjectType()
export class RoomMemberModel {
  @Field(() => ID)
  roomId: string;

  @Field(() => ID)
  userId: string;

  @Field()
  role: string;

  @Field()
  joinedAt: Date;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => ID, { nullable: true })
  invitedBy: string | null;

  @Field(() => UserModel, { nullable: true })
  inviter?: UserModel | null;
}
