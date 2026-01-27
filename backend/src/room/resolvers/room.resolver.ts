import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { RoomModel } from '../models/room.model';
import { CreateRoomInput } from '../inputs/create-room.input';
import { CreateRoomUseCase } from '../usecases/create-room.usecase';
import {
  GqlAuth,
  BetterAuthUser,
} from '../../common/decorators/gql-auth.decorator';

@Resolver(() => RoomModel)
export class RoomResolver {
  constructor(private readonly createRoomUseCase: CreateRoomUseCase) {}

  @Mutation(() => RoomModel)
  @UseGuards(AuthGuard)
  async createRoom(
    @Args('input') input: CreateRoomInput,
    @GqlAuth() user: BetterAuthUser,
  ): Promise<RoomModel> {
    return await this.createRoomUseCase.execute({
      name: input.name,
      createdBy: user.id,
    });
  }
}
