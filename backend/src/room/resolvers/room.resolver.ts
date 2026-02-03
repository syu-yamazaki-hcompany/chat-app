// resolvers/room.resolver.ts

import { Resolver, Mutation, Query, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { RoomModel } from '../models/room.model';
import { RoomMemberModel } from '../models/room-member.model';
import { CreateRoomInput } from '../inputs/create-room.input';
import { InviteToRoomInput } from '../inputs/invite-to-room.input';
import { CreateRoomUseCase } from '../usecases/create-room.usecase';
import { JoinRoomUseCase } from '../usecases/join-room.usecase';
import { LeaveRoomUseCase } from '../usecases/leave-room.usecase';
import { InviteToRoomUseCase } from '../usecases/invite-to-room.usecase';
import { GetJoinedRoomsUseCase } from '../usecases/get-joined-rooms.usecase';
import {
  GqlAuth,
  BetterAuthUser,
} from '../../common/decorators/gql-auth.decorator';

@Resolver(() => RoomModel)
export class RoomResolver {
  constructor(
    private readonly createRoomUseCase: CreateRoomUseCase,
    private readonly joinRoomUseCase: JoinRoomUseCase,
    private readonly leaveRoomUseCase: LeaveRoomUseCase,
    private readonly inviteToRoomUseCase: InviteToRoomUseCase,
    private readonly getJoinedRoomsUseCase: GetJoinedRoomsUseCase,
  ) {}

  @Query(() => [RoomModel])
  @UseGuards(AuthGuard)
  async joinedRooms(@GqlAuth() user: BetterAuthUser): Promise<RoomModel[]> {
    return await this.getJoinedRoomsUseCase.execute(user.id);
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

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async leaveRoom(
    @Args('roomId', { type: () => ID }) roomId: string,
    @GqlAuth() user: BetterAuthUser,
  ): Promise<boolean> {
    return await this.leaveRoomUseCase.execute(roomId, user.id);
  }

  @Mutation(() => RoomMemberModel)
  @UseGuards(AuthGuard)
  async inviteToRoom(
    @Args('input') input: InviteToRoomInput,
    @GqlAuth() user: BetterAuthUser,
  ): Promise<RoomMemberModel> {
    return await this.inviteToRoomUseCase.execute(
      input.roomId,
      input.userId,
      user.id,
    );
  }
}
