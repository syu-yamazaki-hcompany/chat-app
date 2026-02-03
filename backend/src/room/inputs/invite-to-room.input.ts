import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class InviteToRoomInput {
  @Field(() => ID)
  roomId: string;

  @Field(() => ID)
  userId: string;
}
