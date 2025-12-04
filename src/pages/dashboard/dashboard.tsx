import { Outlet, useNavigate } from "react-router-dom";
import "./dashboard.scss";
import { Button } from "src/components/buttons/invisible-button/invisible-button";
import { useCallback } from "react";

export const Dashboard = () => {
  const navigate = useNavigate();

  const goToEstimates = useCallback(() => navigate("/dashboard/estimates"), []);

  return (
    <div className="dashboard">
      <div className="dashboard__sidebar">
        <Button text="Kosztorysy" variant="FILLED" onPress={goToEstimates} />
      </div>
      <div className="dashboard__inner">
        <Outlet />
      </div>
    </div>
  );
};
