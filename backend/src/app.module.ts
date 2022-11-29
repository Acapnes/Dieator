import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodModule } from './models/food/food.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/dieator'),FoodModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
