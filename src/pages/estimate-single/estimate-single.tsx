import { useCallback } from "react";
import { useParams } from "react-router-dom";
import EstimateSingleName from "src/components/estimate-single-name/estimate-single-name";
import { EstimatesSingleTable } from "src/components/estimate-single-table/estimates-single-table";
import EstimateSingleTotal from "src/components/estimate-single-total/estimate-single-total";
import "./estimate-single.scss";
import Select, { type OptionType } from "src/components/select/select";
import { usePopupContext } from "src/context/popup-context";
import { PositionForm } from "src/components/forms/position-form/position-form";
import ServiceForm from "src/components/forms/service-form/service-form";
import {
  useEditEstimateName,
  useGetSingleEstimate,
} from "src/api/estimates/useApiEstimates";
import { useAddEstimateItem } from "src/api/estimates/useApiEstimatesItems";
import type {
  AddItemToEstimateBody,
  EstimateItemTypeEnum,
} from "src/types/estimates.types";

const SINGLE_SELECT_OPTIONS: OptionType<EstimateItemTypeEnum>[] = [
  { value: "SERVICE", text: "Dodaj usługę" },
  { value: "MATERIAL", text: "Dodaj materiał" },
];

export const EstimateSingle = () => {
  const { addEstimateItemAsync } = useAddEstimateItem();
  const { editEstimateNameAsync } = useEditEstimateName();

  const { openPopup, closePopup } = usePopupContext();
  const { id } = useParams();

  const { estimate } = useGetSingleEstimate(id!);

  const onEstimateNameChange = useCallback(
    async (estimateId: string, newName: string) => {
      await editEstimateNameAsync({ estimateId, name: newName });
    },
    []
  );

  const onActiveOption = useCallback(
    (op: OptionType<EstimateItemTypeEnum>) => {
      if (!estimate) return;

      switch (op.value) {
        case "MATERIAL":
          openPopup({
            title: "Dodaj material",
            body: (
              <PositionForm
                onSubmit={async (body: AddItemToEstimateBody) => {
                  await addEstimateItemAsync({
                    params: { estimateId: estimate._id },
                    body,
                  });

                  closePopup();
                }}
                onCancel={closePopup}
              />
            ),
            type: "MATERIAL",
          });
          break;
        case "SERVICE":
          openPopup({
            title: "Dodaj usługę",
            body: (
              <ServiceForm
                onSubmit={async (body) => {
                  await addEstimateItemAsync({
                    params: { estimateId: estimate._id },
                    body,
                  });
                  closePopup();
                }}
                onCancel={closePopup}
              />
            ),
            type: "SERVICE",
          });
          break;
        default:
          return;
      }
    },
    [estimate]
  );

  if (!estimate || !id) return;
  return (
    <div className="estimate-single">
      <div className="estimate-single__top">
        <EstimateSingleName
          name={estimate.name}
          onSubmit={(newName: string) =>
            onEstimateNameChange(estimate._id, newName)
          }
        />
        <EstimateSingleTotal totalValue={estimate.totalValue} />
      </div>
      <div className="estimate-single__inner">
        <Select
          options={SINGLE_SELECT_OPTIONS}
          onActiveOption={onActiveOption}
          changeName={false}
          name={"Dodaj Pozycję"}
        />
      </div>
      <div className="estimate-single__outer">
        <EstimatesSingleTable data={estimate} />
      </div>
    </div>
  );
};
