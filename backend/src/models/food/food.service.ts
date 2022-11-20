import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { FoodCreationDto } from 'src/dtos/food.creation.dto';
import { Food, FoodDocument } from 'src/schemas/food.schema';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) {}

  async findAll(): Promise<Food[]> {
    return this.foodModel.find({});
  }

  async createFood(file : any, foodCreationDto: FoodCreationDto){
    const newFood = await new this.foodModel(foodCreationDto);

    newFood.food_image.data = file.buffer;
    newFood.food_image.contentType = file.mimetype;

    await newFood.save()
    return newFood;
  }
}
