import { FoodDto } from "../Food/food.dto";

export interface DietListDto {
  totalDietCalorie: number;
  totalMealsCalories: number[];
  totalDietMacroTypes: {
    fat: number;
    carbs: number;
    protein: number;
  };
  mealList: FoodDto[];
}
