import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface BetterAuthUser {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const GqlAuth = createParamDecorator(
  (data: unknown, context: ExecutionContext): BetterAuthUser | undefined => {
    const ctx = GqlExecutionContext.create(context);

    const { req } = ctx.getContext<{ req: { user?: BetterAuthUser } }>();

    return req.user;
  },
);
