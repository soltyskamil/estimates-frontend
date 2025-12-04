import { Button } from "src/components/buttons/invisible-button/invisible-button";
import "./estimates.scss";
import { EstimateSearchbar } from "src/components/searchbar/searchbar";
import Select, { type OptionType } from "src/components/select/select";
import { PlusSquareOutlined } from "@ant-design/icons";
import { EstimatesTable } from "src/components/estimates-table/estimates-table";
import { useEstimateActions } from "src/context/estimate-context";
import { usePopupContext } from "src/context/popup-context";
import { NewMaterialForm } from "src/components/forms/new-material-form/new-material-form";
import { useCallback } from "react";
import { useAddEstimate } from "src/api/estimates/useApiEstimates";
const SELECT_OPTIONS: OptionType[] = [
  {
    value: "date",
    text: "Data utworzenia",
  },
  {
    value: "name",
    text: "Nazwa",
  },
  { value: "suma", text: "Suma" },
];

const Estimates = () => {
  const { openPopup, closePopup } = usePopupContext();
  const { sortEstimates } = useEstimateActions();

  const { addEstimateAsync } = useAddEstimate();

  const onFormSubmit = useCallback(
    async (estimateName: string) =>
      await addEstimateAsync({ name: estimateName }),
    []
  );

  const onActiveOption = useCallback((op: OptionType) => sortEstimates(op), []);

  return (
    <div className="estimates">
      <header className="estimates__header">
        <h1 className="estimates__title">Kosztorysy budowlane</h1>
        <p className="estimates__subtitle">
          Zarządzaj kostorysami budów i remontów
        </p>
      </header>
      <div className="estimates__actions">
        <div className="estimates__search">
          <EstimateSearchbar searchFor="estimates__search" />
        </div>
        <div className="estimates__end">
          <Select
            options={SELECT_OPTIONS}
            onActiveOption={onActiveOption}
            name="Sortuj wg:"
            changeName={true}
          />
          <Button
            icon={
              <PlusSquareOutlined
                style={{ fontSize: "18px", color: "white" }}
              />
            }
            variant="FILLED"
            text="Nowy kosztorys"
            onPress={() =>
              openPopup({
                type: "MATERIAL",
                title: "Dodaj nowy kosztorys",
                body: (
                  <NewMaterialForm
                    onSubmit={(estimateName: string) => {
                      onFormSubmit(estimateName);
                      closePopup();
                    }}
                  />
                ),
              })
            }
          />
        </div>
      </div>
      <div className="estimates__info">
        <EstimatesTable />
      </div>
    </div>
  );
};

export default Estimates;
