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
    const resultDevidedFoodsRandomizeCalories = await this.dietHelperService.mealRandomCalories(dietDesiredValues);
    return await this.returnDietList(resultDevidedFoodsRandomizeCalories);
  }

  async getMealForValues(mealCalorie: any,mealTime: string): Promise<Food> {
    let extraCalorieLimit = 5;
    let selectedMeal = await this.foodModel.findOne({
      mainMealTimeType: mealTime,
      kcal: {
        $gte: parseInt(mealCalorie) - extraCalorieLimit / 2,
        $lte: parseInt(mealCalorie) + extraCalorieLimit,
      },
    });

    if (selectedMeal === null) {
      while (extraCalorieLimit <= 15) {
        extraCalorieLimit += 5;
        selectedMeal = await this.foodModel.findOne({
          mainMealTimeType: mealTime,
          kcal: {
            $gte: parseInt(mealCalorie) - extraCalorieLimit / 2,
            $lte: parseInt(mealCalorie) + extraCalorieLimit,
          },
        });
      }
    }

    return selectedMeal;
  }

  async returnDietList(resultDevidedFoodsRandomizeCalories: Array<String>) {
    let returnFoodArray = [];
    for (let i = 0; i < resultDevidedFoodsRandomizeCalories.length; i++) {
      returnFoodArray.push([]);
      for (let j = 0; j < resultDevidedFoodsRandomizeCalories[i].length; j++) {
        returnFoodArray[i].push(
          await this.getMealForValues(
            resultDevidedFoodsRandomizeCalories[j],
            await this.dietHelperService.maelTimeSwitcher(i),
          ),
        );
      }
    }
    return await returnFoodArray;
  }
}
