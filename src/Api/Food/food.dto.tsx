export interface FoodDto {
  title: string;

  mainMacroType: string;

  mainMealTimeType: string[];

  prepTime: string;

  cookTime: string;

  kcal: Number;

  carbs: string;

  fat: string;

  protein: string;

  preparation: string;

  food_image: {
    data: Buffer;
    contentType: string;
  };
}
