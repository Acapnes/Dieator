import { Injectable } from '@nestjs/common';
import { DietDesiredValues } from 'src/dtos/diet/diet.desired.values.dto';

@Injectable()
export class DietHelperService {

  async mealRandomCalories(dietDesiredValues: DietDesiredValues) {
    const resultDevidedMeals = await this.divideDietToMeals(dietDesiredValues);
    const snackCount = dietDesiredValues.mealCount > 3 ? dietDesiredValues.mealCount - 3 : 0;
    let randomizeArray = [];
    resultDevidedMeals.forEach(async (food, foodTimeIndex) => {
      const randomized = await this.mealCalorieRandomizator(food);
      if (foodTimeIndex < 3) {
        randomizeArray.push([]);
        randomizeArray[foodTimeIndex].push(randomized[0], randomized[1]);
      } else
        randomizeArray.push(
          await this.snackCalorieRandomizator(food, snackCount),
        );
    });
    return await randomizeArray;
  }

  async maelTimeSwitcher(maelTime: Number): Promise<string> {
    switch (maelTime) {
      case 0: {
        return 'breakfast';
      }
      case 1: {
        return 'lunch';
      }
      case 2: {
        return 'dinner';
      }
      case 3: {
        return 'snack';
      }
    }
  }

  async mealCalorieRandomizator(totalMealCalorie: any) {
    const randomCaloriePercentile = Math.floor(Math.random() * 60) + 30;
    const secondPercentile = 100 - randomCaloriePercentile;

    return [
      ((parseInt(totalMealCalorie) * randomCaloriePercentile) / 100).toFixed(),
      ((parseInt(totalMealCalorie) * secondPercentile) / 100).toFixed(),
    ];
  }

  async snackCalorieRandomizator(totalSnackCalorie: any, snackCount: number) {
    let snackArray = [];
    for (let i = 0; i < snackCount; i++) {
      snackArray.push((totalSnackCalorie / snackCount).toFixed());
    }
    return snackArray;
  }

  async divideDietToMeals(dietDesiredValues: DietDesiredValues) {
    switch (dietDesiredValues.mealCount) {
      case 1: {
        return [dietDesiredValues.totalCalories];
      }
      case 2: {
        return [
          (parseInt(dietDesiredValues.totalCalories) * 45.5) / 100,
          (parseInt(dietDesiredValues.totalCalories) * 54.5) / 100,
        ];
      }
      case 3: {
        return [
          (parseInt(dietDesiredValues.totalCalories) * 29) / 100,
          (parseInt(dietDesiredValues.totalCalories) * 35.5) / 100,
          (parseInt(dietDesiredValues.totalCalories) * 35.5) / 100,
        ];
      }
      default: {
        const snackCount = dietDesiredValues.mealCount - 3;
        const snackCalories = 5 * snackCount;
        const mealCalories =
          parseInt(dietDesiredValues.totalCalories) -
          (parseInt(dietDesiredValues.totalCalories) * snackCalories) / 100;
        return [
          (mealCalories * 29) / 100,
          (mealCalories * 35.5) / 100,
          (mealCalories * 35.5) / 100,
          (parseInt(dietDesiredValues.totalCalories) * snackCalories) / 100,
        ];
      }
    }
  }
}
