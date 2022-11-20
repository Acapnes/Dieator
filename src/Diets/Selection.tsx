import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertToast from "../components/AlertToast";
import AnimateHeight from "react-animate-height";
import { ChangeMealInputs, ChangeSelectionState } from "../components/redux/DietRedux";

const Selection = () => {
  const { selectionView } = useSelector((state: any) => state.dietRedux);
  const [inputCalorie, setInputCalorie] = useState<Number>();
  const [inputMealCount, setInputMealCount] = useState<Number>();
  const [showAlertToast, setShowAlertToast] = useState(false);
  const [alertToastMessage, setAlertToastMessage] = useState("");
  const dispatch = useDispatch();

  const saveUserRequests = async () => {
    if (!inputCalorie || !inputMealCount) {
      setAlertToastMessage("Please fill the blanks");
      setShowAlertToast(true);
      return;
    }

    if (inputMealCount > 9 || inputMealCount <= 0) {
      setAlertToastMessage(`Meal count must between 1 to 9`);
      setShowAlertToast(true);
      return;
    }

    if (
      inputCalorie < 100 * parseInt(inputMealCount.toString()) ||
      inputCalorie > 1000 * parseInt(inputMealCount.toString())
    ) {
      setAlertToastMessage(
        `Calorie must between ${100 * parseInt(inputMealCount.toString())} to ${
          1000 * parseInt(inputMealCount.toString())
        }`
      );
      setShowAlertToast(true);
      return;
    }

    dispatch(
      ChangeMealInputs({
        inputCalorie,
        inputMealCount,
      })
    );

    dispatch(ChangeSelectionState());
  };

  return (
    <div className="flex p-3">
      <AnimateHeight duration={500} height={"auto"}>
        <div
          id="Selection"
          className={`flex flex-col justify-center items-center overflow-hidden`}
        >
          {showAlertToast && (
            <div>
              <AlertToast message={alertToastMessage} />
            </div>
          )}
          <div className="">
            <div className="text-center space-y-5">
              <p className="text-3xl font-bold">
                Put your body values and activity autopilot
              </p>
              <p className="text-lg font-normal text-center">
                Dieator creates personalized meal plans based on your body
                values and daily activities. Reach your diet and nutritional
                goals with our calorie calculator, weekly meal plans, grocery
                lists and more. Create your meal plan right here in seconds.
              </p>
            </div>
            {!selectionView && (
              <p
                onClick={() => dispatch(ChangeSelectionState())}
                className="text-center underline text-xl text-purple-700 font-semibold py-2 cursor-pointer"
              >
                Change Diet Plan
              </p>
            )}
            <AnimateHeight
              duration={400}
              height={selectionView ? "auto" : 0}
              className={`w-full flex justify-center ${
                selectionView && "pt-5"
              }`}
            >
              <div className="flex flex-col items-end space-y-3">
                <div className=" flex flex-row space-x-3 items-center">
                  <p className="font-semibold pl-1 whitespace-nowrap">
                    Total Calories
                  </p>
                  <input
                    onChange={(e) => setInputCalorie(parseInt(e.target.value))}
                    type="number"
                    className="w-[15rem] bg-transparent outline-none px-1 py-1.5 border-[1px] border-gray-400 rounded-[0.2rem]"
                  />
                </div>
                <div className="flex flex-row space-x-3 items-center">
                  <p className="font-semibold pl-1 whitespace-nowrap">
                    Meal count
                  </p>
                  <input
                    onChange={(e) =>
                      setInputMealCount(parseInt(e.target.value))
                    }
                    type="number"
                    className="w-[15rem] bg-transparent outline-none px-1 py-1.5 border-[1px] border-gray-400 rounded-[0.18rem]"
                  />
                </div>
                <div className="w-full flex justify-center pt-3">
                  <button
                    onClick={() => saveUserRequests()}
                    className="px-5 py-2.5 text-lg rounded-[0.18rem] bg-purple-500 text-gray-100 bg-opacity-80 duration-300 hover:bg-purple-700 hover:bg-opacity-90"
                  >
                    Show me!
                  </button>
                </div>
              </div>
            </AnimateHeight>
          </div>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default Selection;
