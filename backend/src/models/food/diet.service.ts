import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DietDesiredValues } from 'src/dtos/diet/diet.desired.values.dto';
import { DietDivieToMealsDto } from 'src/dtos/diet/diet.divide.to.meals.dto';
import { FoodCreationDto } from 'src/dtos/food.creation.dto';
import { Food, FoodDocument } from 'src/schemas/food.schema';
import { DietHelperService } from './diet.helper.service';

@Injectable()
export class DietService {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>, private dietHelperService:DietHelperService) {}

  async createDiet(dietDesiredValues: DietDesiredValues): Promise<Food[]> {
    const resultDevidedMealsRandomizeCalories = await this.dietHelperService.mealRandomCalories(dietDesiredValues);
    console.log(resultDevidedMealsRandomizeCalories);
    return [
        resultDevidedMealsRandomizeCalories?.breakfast && await this.getMealForValues(resultDevidedMealsRandomizeCalories.breakfast?.first, 'breakfast'),
        resultDevidedMealsRandomizeCalories?.breakfast && await this.getMealForValues(resultDevidedMealsRandomizeCalories.breakfast?.second,'breakfast'),
        resultDevidedMealsRandomizeCalories?.lunch && await this.getMealForValues(resultDevidedMealsRandomizeCalories?.lunch?.first,'lunch'),
        resultDevidedMealsRandomizeCalories?.lunch && await this.getMealForValues(resultDevidedMealsRandomizeCalories?.lunch?.second,'lunch'),
        resultDevidedMealsRandomizeCalories?.dinner && await this.getMealForValues(resultDevidedMealsRandomizeCalories?.dinner?.first,'dinner'),
        resultDevidedMealsRandomizeCalories?.dinner && await this.getMealForValues(resultDevidedMealsRandomizeCalories?.dinner?.second,'dinner'),
    ]
  };  

  async getMealForValues(mealCalorie: any, mealTime:string): Promise<Food> {
    return this.foodModel.findOne({mainMealTimeType: mealTime ,kcal: {$gte: parseInt(mealCalorie) - 20,$lte: parseInt(mealCalorie) + 20}})
  }
}
