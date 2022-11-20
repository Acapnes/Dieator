import { useEffect, useState } from "react";
import { FoodDto } from "../../Api/Food/food.dto";
import { AlarmIcon, ArrowDownIcon } from "../../components/Utils/SvgIcons";

const MealView = (props: any) => {
  const [mealName, setMealName] = useState<string>();
  const [showExtendMenu, setShowExtendMenu] = useState<Boolean>(false);

  const setAllStates = async () => {
    switch (props?.mealIndex) {
      case 0: {
        setMealName("Breakfast");
        break;
      }
      case 1: {
        setMealName("Lunch");
        break;
      }
      case 2: {
        setMealName("Dinner");
        break;
      }
      case 3: {
        setMealName("Snack");
        break;
      }
      default: {
        setMealName("Snack");
        break;
      }
    }
  };

  useEffect(() => {
    setAllStates();
  }, []);

  return (
    <div className={`w-full flex flex-col space-y-2 `}>
      <button
        onClick={() => setShowExtendMenu(!showExtendMenu)}
        className="flex flex-row justify-between items-center px-5 py-1 bg-orange-500 bg-opacity-0 duration-300 hover:bg-opacity-75 group"
      >
        <div className="flex flex-col items-start">
          <p className="font-bold text-lg">{mealName}</p>
          <p className="font-light text-[0.95rem]">
            {props.mealCalorie} Calories
          </p>
        </div>
        <div className="opacity-70 group-hover:bg-opacity-100 duration-300">
          <ArrowDownIcon />
        </div>
      </button>
      {props.foodArray.map(
        (food: FoodDto, foodIndex: any) =>
          food && (
            <div
              key={foodIndex}
              className="flex flex-row space-x-2 max-h-[10vh] border-2 border-opacity-0 duration-200 hover:cursor-pointer hover:border-opacity-80 mx-5 p-1 rounded-md border-orange-300 relative"
            >
              <img
                src={`data:${food?.food_image?.contentType};base64,${food?.food_image?.data}`}
                alt=""
                className="w-[10vw] lg:w-[4.5vw] flex object-cover rounded-md"
              />
              <div className="w-full flex flex-col text-[0.95rem] items-start">
                <p className="font-semibold">{food?.title}</p>
                <p className="font-light">{food?.kcal.toString()} calories</p>
              </div>
            </div>
          )
      )}
      {showExtendMenu && (
        <div
          className={`grid ${
            props.foodArray.length < 2 ? "grid-cols-1" : "grid-cols-2"
          } gap-8 px-5 border-t-2 pt-3 pb-1`}
        >
          {props.foodArray.map(
            (detailFood: FoodDto, detailFoodIndex: any) =>
              detailFood && (
                <div
                  key={detailFoodIndex}
                  className="w-full flex flex-col relative"
                >
                  <div className="w-full flex flex-col space-y-0.5 text-[0.95rem] items-start">
                    <p className="font-semibold">{detailFood?.title}</p>
                    {detailFood?.prepTime && (
                      <div className="w-full flex flex-row justify-between">
                        <p className="font-light">
                          Avg Preps in {detailFood?.prepTime.toString()}
                        </p>
                        <AlarmIcon />
                      </div>
                    )}
                    {detailFood?.cookTime && (
                      <div className="w-full flex flex-row justify-between">
                        <p className="font-light">
                          Avg Cooks in {detailFood?.cookTime.toString()}
                        </p>
                        <AlarmIcon />
                      </div>
                    )}
                    <div className="w-full flex flex-col pt-1 space-y-1">
                      <div className="w-full flex flex-row justify-between font-semibold text-yellow-600">
                        <p>Carbs</p>
                        <p>{detailFood?.carbs}</p>
                      </div>
                      <div className="w-full flex flex-row justify-between font-semibold text-cyan-500">
                        <p>Fat</p>
                        <p>{detailFood?.fat}</p>
                      </div>
                      <div className="w-full flex flex-row justify-between font-semibold text-red-500">
                        <p>Protein</p>
                        <p>{detailFood?.protein}</p>
                      </div>
                      <div className="w-full flex flex-row justify-between font-semibold text-gray-500">
                        <p>Calorie</p>
                        <p>{detailFood?.kcal.toString()} kcal</p>
                      </div>
                    </div>
                    <div className="w-full flex flex-col"></div>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default MealView;
