import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { portConfig } from './configs/configuration.config';
import * as Joi from 'joi';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().port().required(),
        // DATABASE_PORT: Joi.number().port().required(),
        // DATABASE_USERNAME: Joi.string().min(4).required(),
        // DATABASE_PASSWORD: Joi.string().min(4).required(),
        // DATABASE_HOST: Joi.string().required(),
        // DATABASE_URI: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: false,
      },
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
      load: [portConfig],
      cache: true,
      expandVariables: true,
    }),
  ],
})
export class AppModule {}
