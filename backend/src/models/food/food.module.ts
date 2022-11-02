import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from 'src/schemas/food.schema';
import { DietHelperService } from './diet.helper.service';
import { DietService } from './diet.service';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }])],
  controllers: [FoodController],
  providers: [FoodService,DietService,DietHelperService],
})
export class FoodModule {}
