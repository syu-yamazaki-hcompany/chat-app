import { ObjectType, Field, ID } from '@nestjs/graphql';

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
}
