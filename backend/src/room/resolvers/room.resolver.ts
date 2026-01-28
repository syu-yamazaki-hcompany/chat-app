import { Resolver, Mutation, Query, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { RoomModel } from '../models/room.model';
import { RoomMemberModel } from '../models/room-member.model';
import { CreateRoomInput } from '../inputs/create-room.input';
import { CreateRoomUseCase } from '../usecases/create-room.usecase';
import { JoinRoomUseCase } from '../usecases/join-room.usecase';
import { GetJoinedRoomsUseCase } from '../usecases/get-joined-rooms.usecase';
import { GetUnjoinedRoomsUseCase } from '../usecases/get-unjoined-rooms.usecase';
import {
  GqlAuth,
  BetterAuthUser,
} from '../../common/decorators/gql-auth.decorator';

@Resolver(() => RoomModel)
export class RoomResolver {
  constructor(
    private readonly createRoomUseCase: CreateRoomUseCase,
    private readonly joinRoomUseCase: JoinRoomUseCase,
    private readonly getJoinedRoomsUseCase: GetJoinedRoomsUseCase,
    private readonly getUnjoinedRoomsUseCase: GetUnjoinedRoomsUseCase,
  ) {}

  @Query(() => [RoomModel])
  @UseGuards(AuthGuard)
  async joinedRooms(@GqlAuth() user: BetterAuthUser): Promise<RoomModel[]> {
    return await this.getJoinedRoomsUseCase.execute(user.id);
  }

  @Query(() => [RoomModel])
  @UseGuards(AuthGuard)
  async unjoinedRooms(@GqlAuth() user: BetterAuthUser): Promise<RoomModel[]> {
    return await this.getUnjoinedRoomsUseCase.execute(user.id);
  }

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

  @Mutation(() => RoomMemberModel)
  @UseGuards(AuthGuard)
  async joinRoom(
    @Args('roomId', { type: () => ID }) roomId: string,
    @GqlAuth() user: BetterAuthUser,
  ): Promise<RoomMemberModel> {
    return await this.joinRoomUseCase.execute(roomId, user.id);
  }
}
