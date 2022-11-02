import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DietDesiredValues } from 'src/dtos/diet/diet.desired.values.dto';
import { DietDivieToMealsDto } from 'src/dtos/diet/diet.divide.to.meals.dto';
import { FoodCreationDto } from 'src/dtos/food.creation.dto';
import { Food, FoodDocument } from 'src/schemas/food.schema';

@Injectable()
export class DietHelperService {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) {}

  async mealRandomCalories(dietDesiredValues: DietDesiredValues) {
    const resultDevidedMeals = await this.divideDietToMeals(dietDesiredValues);
    return {
      breakfast: await this.calorieRandomizator(resultDevidedMeals.totalBreakfastCalories),
      lunch: await this.calorieRandomizator(resultDevidedMeals.totalLunchCalories),
      dinner: await this.calorieRandomizator(resultDevidedMeals.totalDinnerCalories),
      snacks: await this.calorieRandomizator(resultDevidedMeals.totalSnackCalories),
    }
  }

  async calorieRandomizator(totalCalorie: any) {
    if (totalCalorie === 0) return;

    const randomCaloriePercentile = Math.floor(Math.random() * 60) + 30;
    const secondPercentile = 100 - randomCaloriePercentile;

    return {
      first: ((parseInt(totalCalorie) * randomCaloriePercentile) /100).toFixed(),
      second: ((parseInt(totalCalorie) * secondPercentile) / 100).toFixed(),
    };
  }

  async divideDietToMeals(dietDesiredValues: DietDesiredValues): Promise<DietDivieToMealsDto> {
    if (dietDesiredValues.mealCount === 1) {
      return {
        totalBreakfastCalories: dietDesiredValues.totalCalories,
        totalLunchCalories: 0,
        totalDinnerCalories: 0,
        totalSnackCalories: 0,
        snacksCount: 0,
      };
    } else if (dietDesiredValues.mealCount === 2) {
      return {
        totalBreakfastCalories:(parseInt(dietDesiredValues.totalCalories) * 45.5) / 100,
        totalLunchCalories:(parseInt(dietDesiredValues.totalCalories) * 54.5) / 100,
        totalDinnerCalories: 0,
        totalSnackCalories: 0,
        snacksCount: 0,
      };
    } else if (dietDesiredValues.mealCount === 3) {
      return {
        totalBreakfastCalories:(parseInt(dietDesiredValues.totalCalories) * 29) / 100,
        totalLunchCalories:(parseInt(dietDesiredValues.totalCalories) * 35.5) / 100,
        totalDinnerCalories:(parseInt(dietDesiredValues.totalCalories) * 35.5) / 100,
        totalSnackCalories: 0,
        snacksCount: 0,
      };
    } else if (dietDesiredValues.mealCount > 3) {
      const snackCount = dietDesiredValues.mealCount - 3;
      return {
        totalBreakfastCalories:(parseInt(dietDesiredValues.totalCalories) * 29) / 100,
        totalLunchCalories:(parseInt(dietDesiredValues.totalCalories) * 35.5) / 100,
        totalDinnerCalories:(parseInt(dietDesiredValues.totalCalories) * 35.5) / 100,
        totalSnackCalories: 0,
        snacksCount: snackCount,
      };
    }
  }
}
