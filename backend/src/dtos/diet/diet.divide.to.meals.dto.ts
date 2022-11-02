import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DietDivieToMealsDto {
  totalBreakfastCalories?: Number;

  totalLunchCalories?: Number;

  totalDinnerCalories?: Number;

  totalSnackCalories?: Number;

  snacksCount?: Number;
}
