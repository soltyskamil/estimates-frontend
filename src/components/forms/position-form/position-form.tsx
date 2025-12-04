import { Button } from "src/components/buttons/invisible-button/invisible-button";
import "./position-form.scss";
import { useCallback, useState } from "react";
import type { AddItemToEstimateBody } from "src/types/estimates.types";

export type PositionFormData = {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
};

type PositionFormProps = {
  data?: AddItemToEstimateBody;

  onSubmit: (formData: AddItemToEstimateBody) => void;
};

export const PositionForm = ({ data, onSubmit }: PositionFormProps) => {
  const [formData, setFormData] = useState<AddItemToEstimateBody>(() =>
    data
      ? data
      : {
          name: "",
          type: "MATERIAL",
          totalPrice: 0,
          quantity: 0,
          unit: "PIECE",
          unitPrice: 0,
        }
  );

  const { name, quantity, unit, unitPrice } = formData;

  const handleFormChange = useCallback(
    <K extends keyof PositionFormData>(key: K, value: PositionFormData[K]) => {
      setFormData((p) => ({ ...p, [key]: value }));
    },
    []
  );

  return (
    <form
      className="position-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <div className="position-form__name">
        <label htmlFor="position-form__material">Nazwa materiału</label>
        <input
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
          <label htmlFor="position-form__unit">Jednostka</label>
          <select
            name="position-form__unit"
            id="position-form__unit"
            value={unit}
            onChange={(e) => handleFormChange("unit", e.target.value)}
          >
            <option value="szt">Szt.</option>
            <option value="m2">Szt.</option>
            <option value="mb">Szt.</option>
          </select>
        </div>
      </div>
      <div className="position-form__unitprice">
        <label htmlFor="position-form__unitprice">
          Cena jednostkowa netto (zł)
        </label>
        <input
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
          Wartość pozycji: <b>0,00zł</b>
        </span>
      </div>
      <div className="position-form__actions">
        <Button variant="INVISIBLE" text="Anuluj" onPress={() => null} />

        <Button variant="FILLED" text="Zatwierdź" onPress={() => null} />
      </div>
    </form>
  );
};
