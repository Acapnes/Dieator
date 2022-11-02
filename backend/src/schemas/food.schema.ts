import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FoodDocument = Food & Document;

@Schema()
export class Food {
  @Prop({ required: true })
  mainMacroType: string;

  @Prop({ required: true })
  mainMealTimeType: string[];

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  prepTime: string;

  @Prop({ required: false })
  cookTime: string;

  @Prop({ required: true })
  kcal: Number;

  @Prop({ required: true })
  carbs: string;

  @Prop({ required: true })
  fat: string;

  @Prop({ required: true })
  protein: string;

  @Prop({ required: true })
  preparation: string;

  @Prop({ type: Object, required: true, default: { data: null, contentType: null }})
  food_image: {
    data: Buffer;
    contentType: string;
  };
}

export const FoodSchema = SchemaFactory.createForClass(Food);
