// message.resolver.ts
import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { MessageModel } from './models/message.model';
import { CreateMessageInput } from './models/message.input';
import { CreateMessageUseCase } from './usecases/create-message.usecase';
import { GetMessagesUseCase } from './usecases/get-message.usecase';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { GqlAuth } from '../common/decorators/gql-auth.decorator';
import { BetterAuthUser } from '../common/decorators/gql-auth.decorator';

@Resolver(() => MessageModel)
export class MessageResolver {
  constructor(
    private readonly createMessageUseCase: CreateMessageUseCase,
    private readonly getMessagesUseCase: GetMessagesUseCase,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Query(() => [MessageModel])
  @UseGuards(AuthGuard)
  async getMessages(
    @Args('roomId', { type: () => String }) roomId: string,
  ): Promise<MessageModel[]> {
    return this.getMessagesUseCase.execute(roomId);
  }

  @Mutation(() => MessageModel)
  @UseGuards(AuthGuard)
  async createMessage(
    @Args('input') input: CreateMessageInput,
    @GqlAuth() user: BetterAuthUser,
  ): Promise<MessageModel> {
    const { roomId, content } = input;
    const authenticatedUserId = user.id;
    return this.createMessageUseCase.execute(
      content,
      roomId,
      authenticatedUserId,
    );
  }

  @Subscription(() => MessageModel, {
    name: 'messageAdded',
    filter: (
      payload: { messageAdded: MessageModel },
      variables: { roomId: string },
    ) => payload.messageAdded.roomId === variables.roomId,
  })
  @UseGuards(AuthGuard)
  messageAdded(
    @Args('roomId', { type: () => String }) _roomId: string,
  ): AsyncIterator<MessageModel> {
    return this.pubSub.asyncIterableIterator('messageAdded');
  }
}
