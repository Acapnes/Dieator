import { FoodService } from './food.service';
import { Body, Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Food } from 'src/schemas/food.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { DietService } from './diet.service';
import { DietDesiredValues } from 'src/dtos/diet/diet.desired.values.dto';
import { DietDivieToMealsDto } from 'src/dtos/diet/diet.divide.to.meals.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService, private readonly dietService: DietService) {}

  @Get()
  async getPics(): Promise<Food[]> {
    return this.foodService.findAll();
  }

  @Post('/diet')
  async getDiet(@Body() dietDesiredValues: DietDesiredValues): Promise<Food[] | any> {
    return this.dietService.createDiet(dietDesiredValues);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('food_image'))
  async uploadImage(@UploadedFile() file, @Req() req, @Body() body){
    return await this.foodService.createFood(file,body)
  }
}
