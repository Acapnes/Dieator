import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DietApi } from "../Api/Diet/DietApi";
import { DietListDto } from "../Api/Diet/diet.list.dto";
import {
  CircleCalorieDevidedMealMacrosIcon,
  CircleCalorieDevidedTotalCalorieIcon,
  MoreIcon,
  RepeatIcon,
} from "../components/Utils/SvgIcons";
import MealView from "./components/MealView";
import { FoodDto } from "../Api/Food/food.dto";
import { SetDietList } from "../components/redux/DietRedux";

const DietList = () => {
  const { inputCalorie } = useSelector((state: any) => state.dietRedux);
  const { inputMealCount } = useSelector((state: any) => state.dietRedux);
  const { initDietList } = useSelector((state: any) => state.dietRedux);

  const [showDietCalorieExtendedMenu, setShowDietCalorieExtendedMenu] =
    useState(false);

  const dispatch = useDispatch();

  const setNewDiet = async (inputCalorie: number,inputMealCount: number): Promise<DietListDto> => {
    return await DietApi.getDietList({
      totalCalories: inputCalorie,
      mealCount: inputMealCount,
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full flex flex-col space-y-2 shadow-xl rounded-sm py-3 bg-gray-200">
        <div className="w-full flex flex-row justify-between items-center px-3">
          <p className="text-xl lg:text-3xl ">Your's Meal Plan</p>
          <div className="flex flex-col space-y-1">
            <div
              onClick={async () => {
                dispatch(
                  SetDietList(await setNewDiet(inputCalorie, inputMealCount))
                );
              }}
              className="flex flex-row space-x-2 items-center justify-between group"
            >
              <p className="cursor-pointer text-gray-700 opacity-70 duration-500 group-hover:opacity-100 group-hover:text-gray-900 whitespace-nowrap">
                Regenerate
              </p>
              <div className="cursor-pointer opacity-60 duration-500 group-hover:opacity-100">
                <RepeatIcon />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-3">
          <div className="w-full px-2">
            <div
              onClick={() =>
                setShowDietCalorieExtendedMenu(!showDietCalorieExtendedMenu)
              }
              className="group w-full flex flex-row items-center justify-between space-x-1 border-[1px] border-gray-800 border-opacity-30 rounded-[0.18rem] px-3 py-1.5 duration-300 hover:cursor-pointer hover:shadow-md"
            >
              <div className="flex flex-row items-center space-x-1 font-[500]">
                <CircleCalorieDevidedTotalCalorieIcon />
                <p>{initDietList?.totalDietCalorie} Calories</p>
                <p className="opacity-60 font-[300]">
                  - in {inputMealCount} meals
                </p>
              </div>
              <div className="rounded-full border-[2px] p-1 border-gray-700 opacity-50 group-hover:opacity-90 duration-300">
                <MoreIcon />
              </div>
            </div>
          </div>
          {showDietCalorieExtendedMenu && (
            <div className="w-full px-2">
              <div className="w-full max-h-[40vh] flex flex-row justify-evenly space-y-4 px-2 py-4 overflow-y-auto shadow-md rounded-sm scrollbar-hide">
                <div className="w-ful h-[70%] flex justify-center">
                  <CircleCalorieDevidedMealMacrosIcon
                    macroTypes={initDietList?.totalDietMacroTypes}
                  />
                </div>
                <div className="w-fit min-w-[40%] flex flex-col items-center px-5">
                  <div className="w-full min-w-[55%] flex flex-row space-x-5 justify-between font-semibold text-yellow-600">
                    <p>Carbs</p>
                    <p>{initDietList?.totalDietMacroTypes?.carbs}g</p>
                  </div>
                  <div className="w-full min-w-[55%] flex flex-row space-x-5 justify-between font-semibold text-cyan-500">
                    <p>Fat</p>
                    <p>{initDietList?.totalDietMacroTypes?.fat}g</p>
                  </div>
                  <div className="w-full min-w-[55%] flex flex-row space-x-5 justify-between font-semibold text-red-500">
                    <p>Protein</p>
                    <p>{initDietList?.totalDietMacroTypes?.protein}g</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {initDietList?.mealList?.length > 0 &&
            initDietList?.mealList.map((meal: FoodDto, mealIndex: number) => (
              <div className="w-full" key={mealIndex}>
                <MealView
                  foodArray={meal}
                  mealIndex={mealIndex}
                  mealCalorie={initDietList?.totalMealsCalories[mealIndex]}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DietList;
