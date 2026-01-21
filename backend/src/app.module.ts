import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { PubSubModule } from './pubsub/pubsub.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth';
import { Request, Response } from 'express';

@Module({
  imports: [
    AuthModule.forRoot({
      auth,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
          onConnect: () => true,
        },
      },
      context: ({
        req,
        res,
        extra,
      }: {
        req: Request;
        res: Response;
        extra?: { request: Request };
      }) => ({
        req: extra ? extra.request : req,
        res,
      }),
    }),
    PubSubModule,
    MessageModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
