import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/database.sqlite',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      // synchronize: true,
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule { }
