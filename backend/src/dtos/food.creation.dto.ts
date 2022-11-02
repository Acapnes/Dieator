import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class FoodCreationDto {
  @IsNotEmpty()
  @IsString()
  mainMacroType: string;

  @IsNotEmpty()
  @IsString()
  mainMealTimeType: string[];
  
  prepTime: string;

  cookTime: string;

  @IsNotEmpty()
  kcal: Number;

  @IsNotEmpty()
  carbs: string;

  @IsNotEmpty()
  fat: string;

  @IsNotEmpty()
  protein: string;

  @IsNotEmpty()
  preparation: string;

  @IsNotEmpty()
  @IsObject()
  food_image: {
    data: Buffer;
    contentType: string;
  };
}
