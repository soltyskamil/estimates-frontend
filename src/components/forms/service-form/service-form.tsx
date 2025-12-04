import { useCallback, useState } from "react";
import { Button } from "src/components/buttons/invisible-button/invisible-button";
import "./service-form.scss";
import type { AddItemToEstimateBody } from "src/types/estimates.types";
export type ServiceFormData = {
  name: string;
  value: number;
};

type ServiceFormProps = {
  data?: AddItemToEstimateBody;
  onSubmit: (formData: AddItemToEstimateBody) => void;
};

const ServiceForm = ({ data, onSubmit }: ServiceFormProps) => {
  const [formData, setFormData] = useState<AddItemToEstimateBody>(() =>
    data
      ? data
      : {
          name: "",
          totalPrice: 0,
          type: "SERVICE",
        }
  );
  const { name, totalPrice } = formData;

  const handleFormChange = useCallback(
    <K extends keyof AddItemToEstimateBody>(
      key: K,
      value: AddItemToEstimateBody[K]
    ) => {
      setFormData((p) => ({ ...p, [key]: value }));
    },
    []
  );

  return (
    <form
      className="service-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <div className="service-form__name">
        <label htmlFor="service-form__name">Nazwa usługi</label>
        <input
          onChange={(e) => handleFormChange("name", e.target.value)}
          value={name}
          type="text"
          name="service-form__name"
          id="service-form__name"
          placeholder="Np. Malowanie ścian"
        />
      </div>
      <div className="service-form__total">
        <label htmlFor="service-form__total">Cena</label>
        <input
          value={totalPrice}
          onChange={(e) =>
            handleFormChange("totalPrice", Number(e.target.value))
          }
          type="number"
          min={0}
          name="service-form__total"
          id="service-form__total"
          placeholder="Np. Malowanie ścian"
        />
      </div>
      <div className="service-form__totalcount">
        <span>Wartość pozycji: 0,00zł</span>
      </div>
      <div className="service-form__actions">
        <Button variant="INVISIBLE" text="Anuluj" onPress={() => null} />

        <Button variant="FILLED" text="Zatwierdź" onPress={() => null} />
      </div>
    </form>
  );
};

export default ServiceForm;
