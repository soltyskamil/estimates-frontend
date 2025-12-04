import { Button } from "src/components/buttons/invisible-button/invisible-button";
import "./position-form.scss";
import { useCallback, useState } from "react";
import {
  type AddItemToEstimateBody,
  type EstimateItemMaterialUnitsTypeEnum,
} from "src/types/estimates.types";
import Select, { type OptionType } from "src/components/select/select";
import clsx from "clsx";
import useValidateForm, { type Validator } from "src/hooks/useValidateForm";

export type PositionFormData = {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
};

type PositionFormProps = {
  data?: AddItemToEstimateBody;
  onSubmit: (formData: AddItemToEstimateBody) => void;
  onCancel: () => void;
};

const MATERIAL_OPTIONS: OptionType<EstimateItemMaterialUnitsTypeEnum>[] = [
  { value: "BAG", text: "Worek" },
  { value: "PIECE", text: "Szt." },
  { value: "SQRM", text: "m2" },
  { value: "LM", text: "mb" },
];

export type FormErrors = {
  [key in keyof Omit<AddItemToEstimateBody, "type">]: string;
};

export const PositionForm = ({
  data,
  onSubmit,
  onCancel,
}: PositionFormProps) => {
  const [formData, setFormData] = useState<AddItemToEstimateBody>(() =>
    data
      ? data
      : {
          name: "",
          type: "MATERIAL",
          totalPrice: 0,
          quantity: 0,
          unit: undefined,
          unitPrice: 0,
        }
  );

  console.log(formData);
  const validator = useCallback((formData: AddItemToEstimateBody) => {
    const { name, quantity, unit, unitPrice } = formData;
    const errors = {} as FormErrors;

    // if (totalPrice <= 0) errors.totalPrice = "Zbyt mała wartość";
    if (name.length <= 0) errors.name = "Zbyt krótka nazwa, minimum dwa znaki";
    if (!quantity || quantity <= 0) errors.quantity = "Zbyt mała ilośc";
    if (!unit) errors.unit = "Brak wybranego unit";
    if (!unitPrice || unitPrice <= 0) errors.unitPrice = "Zbyt mała wartość";
    console.log(errors);

    return errors;
  }, []) as Validator<Omit<AddItemToEstimateBody, "type">>;

  const { validateForm, getErrorStatus } =
    useValidateForm<Omit<AddItemToEstimateBody, "type">>(validator);

  const { name, quantity, unitPrice } = formData;

  const handleFormChange = useCallback(
    <K extends keyof PositionFormData>(key: K, value: PositionFormData[K]) => {
      setFormData((p) => ({
        ...p,
        [key]: key === "unit" && p[key] === value ? null : value,
      }));
    },
    []
  );

  const passedOption:
    | OptionType<EstimateItemMaterialUnitsTypeEnum>
    | undefined = formData.unit
    ? {
        value: formData.unit,
        text: MATERIAL_OPTIONS.find((v) => v.value === formData.unit)!.text,
      }
    : undefined;

  return (
    <form
      className="position-form"
      onSubmit={(e) => {
        e.preventDefault();
        const validated = validateForm(formData);

        if (validated) onSubmit(formData);
      }}
    >
      <div className="position-form__name">
        <label htmlFor="position-form__material">Nazwa materiału</label>
        <input
          className={clsx("position-form__input", {
            "position-form__input--error": getErrorStatus("name"),
          })}
          onChange={(e) => handleFormChange("name", e.target.value)}
          value={name}
          type="text"
          name="position-form__material"
          id="position-form__material"
          placeholder="Np. Cegła Porotherm 25"
        />
      </div>
      <div className="position-form__quanun">
        <div className="position-form__quantity">
          <label htmlFor="position-form__quantity">Ilość</label>
          <input
            className={clsx("position-form__input", {
              "position-form__input--error": getErrorStatus("quantity"),
            })}
            onChange={(e) =>
              handleFormChange("quantity", Number(e.target.value))
            }
            min={0}
            value={quantity}
            type="number"
            name="position-form__quantity"
            id="position-form__quantity"
            placeholder="0"
          />
        </div>
        <div className="position-form__unit">
          <Select
            name="Jednostka"
            changeName={true}
            passedOption={passedOption}
            options={MATERIAL_OPTIONS}
            onActiveOption={(v) => handleFormChange("unit", v.value)}
            passedStyles={
              getErrorStatus("unit") ? { borderColor: "red" } : undefined
            }
          />
        </div>
      </div>
      <div className="position-form__unitprice">
        <label htmlFor="position-form__unitprice">
          Cena jednostkowa netto (zł)
        </label>
        <input
          className={clsx("position-form__input", {
            "position-form__input--error": getErrorStatus("unitPrice"),
          })}
          onChange={(e) =>
            handleFormChange("unitPrice", Number(e.target.value))
          }
          min={0}
          value={unitPrice}
          type="number"
          name="position-form__unitprice"
          id="position-form__unitprice"
          placeholder="0.00"
        />
      </div>
      <div className="position-form__total">
        <span className="position-form__totalprice">
          Wartość pozycji:{" "}
          {(formData.quantity ?? 0) * (formData.unitPrice ?? 0)}
        </span>
      </div>
      <div className="position-form__actions">
        <Button variant="INVISIBLE" text="Anuluj" onPress={() => onCancel()} />

        <Button
          variant="FILLED"
          text="Zatwierdź"
          onPress={() => {}}
          buttonType={{ type: "submit" }}
        />
      </div>
    </form>
  );
};
