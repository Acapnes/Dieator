import React from "react";
import { WarnIcon } from "./Utils/SvgIcons";

const AlertToast = (props: any) => {
  return (
    <div className="w-fit h-fit px-4 py-3 bg-slate-800 bg-opacity-95 ">
      <div className="flex flex-row  space-x-3">
        <WarnIcon />
        <p className="text-gray-200 font-semibold h-full">{props?.message}</p>
      </div>
    </div>
  );
};

export default AlertToast;
