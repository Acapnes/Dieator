import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DietDesiredValues {
  @IsNotEmpty()
  @IsNumber()
  totalCalories: any;

  @IsNotEmpty()
  @IsNumber()
  mealCount: any;
}
