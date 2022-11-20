import Selection from "./Diets/Selection";
import DietList from "./Diets/DietList";
import Background from "./components/Utils/Background";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeMealInputs, SetDietList } from "./components/redux/DietRedux";

function App() {
  const { initDietList } = useSelector((state: any) => state.dietRedux);
  const dispatch = useDispatch();

  const getInitDietList = async () => {
    if (
      window.localStorage.getItem("dietList") &&
      window.localStorage.getItem("dietInput")
    ) {
      dispatch(
        SetDietList(JSON.parse(window.localStorage.getItem("dietList")!))
      );
      dispatch(
        ChangeMealInputs(JSON.parse(window.localStorage.getItem("dietInput")!))
      );
    }
  };

  useEffect(() => {
    getInitDietList();
  }, []);

  return (
    <div className="min-h-screen min-w-screen">
      <Background />
      <div className="w-full h-full flex justify-center py-8">
        <div className="max-w-[90%] lg:max-w-[50%] shadow-xl rounded-sm flex flex-col bg-gray-200">
          <Selection />
          <DietList />
        </div>
      </div>
    </div>
  );
}

export default App;
