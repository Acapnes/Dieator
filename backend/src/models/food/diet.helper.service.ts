import { Injectable } from '@nestjs/common';
import { DietDesiredValues } from 'src/dtos/diet/diet.desired.values.dto';
import { Food } from 'src/schemas/food.schema';

@Injectable()
export class DietHelperService {
  async mealRandomCalories(dietDesiredValues: DietDesiredValues) {
    const resultDevidedMeals = await this.divideDietToMeals(dietDesiredValues);
    const snackCount =
      dietDesiredValues.mealCount > 3 ? dietDesiredValues.mealCount - 3 : 0;
    let randomizeArray = [];
    resultDevidedMeals.forEach(async (food, foodTimeIndex) => {
      const randomized = await this.mealCalorieRandomizator(food);
      if (foodTimeIndex < 3) {
        randomizeArray.push([]);
        randomizeArray[foodTimeIndex].push(randomized[0], randomized[1]);
      } else {
        const snackArray = await this.snackCalorieRandomizator(
          food,
          snackCount,
        );
        for (let i = 0; i < snackArray.length; i++) {
          randomizeArray.push([]);
          randomizeArray[i + 3].push(snackArray[i]);
        }
      }
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
      default: {
        return 'snack';
      }
    }
  }

  async dietCalorieTotalizer(mealsCaloriesArray: Array<Number>) {
    let totalDietCalorie = 0;
    for (let i = 0; i < mealsCaloriesArray.length; i++) {
      totalDietCalorie += parseInt(mealsCaloriesArray[i].toString());
    }
    return totalDietCalorie;
  }

  async dietMicroTypesTotalizer(mealsCaloriesArray: Food[] | any) {
    let totalCarbs = 0;
    let totalFat = 0;
    let totalProtein = 0;
    for (let i = 0; i < mealsCaloriesArray.length; i++) {
      for (let j = 0; j < mealsCaloriesArray[i].length; j++) {
        if (mealsCaloriesArray[i][j]) {
          totalCarbs += parseInt(mealsCaloriesArray[i][j]?.carbs.toString());
          totalFat += parseInt(mealsCaloriesArray[i][j]?.fat.toString());
          totalProtein += parseInt(
            mealsCaloriesArray[i][j]?.protein.toString(),
          );
        }
      }
    }
    return {
      carbs: totalCarbs,
      fat: totalFat,
      protein: totalProtein,
    };
  }

  async mealCalorieTotalizer(mealArray: Array<Food[]>) {
    let totalMealCalorieArray = [];
    for (let i = 0; i < mealArray.length; i++) {
      for (let j = 0; j < mealArray[i].length - 1; j++) {
        if (!mealArray[i][j]) {
          totalMealCalorieArray.push(
            0 + parseInt(mealArray[i][j + 1]?.kcal.toString()),
          );
        } else if (!mealArray[i][j + 1]) {
          totalMealCalorieArray.push(
            parseInt(mealArray[i][j]?.kcal.toString()) + 0,
          );
        } else if (mealArray[i][j] && mealArray[i][j + 1]) {
          totalMealCalorieArray.push(
            parseInt(mealArray[i][j]?.kcal.toString()) +
              parseInt(mealArray[i][j + 1]?.kcal.toString()),
          );
        } else {
          totalMealCalorieArray.push(0);
        }
      }
      if (i >= 3) {
        totalMealCalorieArray.push(parseInt(mealArray[i][0]?.kcal.toString()));
      }
    }
    return totalMealCalorieArray;
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
