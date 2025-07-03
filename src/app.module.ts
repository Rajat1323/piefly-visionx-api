import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './shared/middlewares/auth.middleware';
import { pgDBConfig } from './configs';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './shared/middlewares/permissions.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(pgDBConfig),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude().forRoutes();
  }
}