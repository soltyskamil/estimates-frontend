import { useCallback, useState } from "react";
import { Button } from "src/components/buttons/invisible-button/invisible-button";
import "./service-form.scss";
import type { AddItemToEstimateBody } from "src/types/estimates.types";
import type { FormErrors } from "../position-form/position-form";
import type { Validator } from "src/hooks/useValidateForm";
import useValidateForm from "src/hooks/useValidateForm";
import clsx from "clsx";
export type ServiceFormData = {
  name: string;
  value: number;
};

type ServiceFormProps = {
  data?: AddItemToEstimateBody;
  onSubmit: (formData: AddItemToEstimateBody) => void;
  onCancel: () => void;
};

const ServiceForm = ({ data, onSubmit, onCancel }: ServiceFormProps) => {
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

  const validator = useCallback((formData: AddItemToEstimateBody) => {
    const { name, totalPrice } = formData;
    const errors = {} as FormErrors;

    if (totalPrice <= 0) errors.totalPrice = "Zbyt mała wartość";
    if (name.length <= 0) errors.name = "Zbyt krótka nazwa, minimum dwa znaki";

    return errors;
  }, []) as Validator<Omit<AddItemToEstimateBody, "type">>;

  const { validateForm, getErrorStatus } =
    useValidateForm<Omit<AddItemToEstimateBody, "type">>(validator);

  return (
    <form
      className="service-form"
      onSubmit={(e) => {
        e.preventDefault();
        const validated = validateForm(formData);
        if (validated) onSubmit(formData);
      }}
    >
      <div className="service-form__name">
        <label htmlFor="service-form__name">Nazwa usługi</label>
        <input
          className={clsx("service-form__input", {
            "service-form__input--error": getErrorStatus("name"),
          })}
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
          className={clsx("service-form__input", {
            "service-form__input--error": getErrorStatus("totalPrice"),
          })}
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
        <span>Wartość pozycji: {formData.totalPrice}zł</span>
      </div>
      <div className="service-form__actions">
        <Button variant="INVISIBLE" text="Anuluj" onPress={() => onCancel()} />

        <Button
          variant="FILLED"
          text="Zatwierdź"
          onPress={() => null}
          buttonType={{ type: "submit" }}
        />
      </div>
    </form>
  );
};

export default ServiceForm;
