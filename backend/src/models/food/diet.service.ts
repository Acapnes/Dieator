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
  constructor(
    @InjectModel(Food.name) private foodModel: Model<FoodDocument>,
    private dietHelperService: DietHelperService,
  ) {}

  async createDiet(dietDesiredValues: DietDesiredValues) {
    const resultDevidedFoodsRandomizeCalories =
      await this.dietHelperService.mealRandomCalories(dietDesiredValues);
    return await this.dietReturnCalories(resultDevidedFoodsRandomizeCalories);
  }

  async getMealForValues(mealCalorie: any, mealTime: string): Promise<Food> {
    return await this.foodModel.findOne({
      mainMealTimeType: mealTime,
      kcal: {
        $gte: parseInt(mealCalorie) - 20,
        $lte: parseInt(mealCalorie) + 20,
      },
    });
  }

  async dietReturnCalories(resultDevidedFoodsRandomizeCalories: Array<String>) {
    let returnFoodArray = [];
    await resultDevidedFoodsRandomizeCalories.forEach(
      (calorie, calorieIndex) => {
        if (calorieIndex < 3) {
         
        }
        console.log(calorieIndex, calorie);
      },
    );
  }
}
