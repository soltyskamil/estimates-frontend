import { Outlet } from "react-router-dom";
import { EstimateContextProvider } from "src/context/estimate-context";

export const EstimatesLayout = () => {
  return (
    <EstimateContextProvider>
      <Outlet />
    </EstimateContextProvider>
  );
};
