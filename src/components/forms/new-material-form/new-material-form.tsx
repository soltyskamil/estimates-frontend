import { useCallback, useState } from "react";
import { Button } from "src/components/buttons/invisible-button/invisible-button";
import "./new-material-form.scss";
import type { AddItemToEstimateBody } from "src/types/estimates.types";
import type { FormErrors } from "../position-form/position-form";
import type { Validator } from "src/hooks/useValidateForm";
import useValidateForm from "src/hooks/useValidateForm";
import clsx from "clsx";
type NewMaterialFormProps = {
  onSubmit: (estimateName: string) => void;
  onCancel: () => void;
};

export const NewMaterialForm = ({
  onSubmit,
  onCancel,
}: NewMaterialFormProps) => {
  const [inputValue, setInputValue] = useState("");

  const validator = useCallback((formData: AddItemToEstimateBody) => {
    const { name } = formData;
    const errors = {} as FormErrors;

    if (name.length <= 0) errors.name = "Zbyt krótka nazwa, minimum dwa znaki";

    return errors;
  }, []) as unknown as Validator<
    Omit<AddItemToEstimateBody, "type" | "totalPrice">
  >;

  const { validateForm, getErrorStatus } =
    useValidateForm<Omit<AddItemToEstimateBody, "type" | "totalPrice">>(
      validator
    );

  return (
    <form
      action="POST"
      onSubmit={(e) => {
        e.preventDefault();
        const validated = validateForm({ name: inputValue });
        if (validated) onSubmit(inputValue);
      }}
      className="new-material-form"
    >
      <div className="new-material-form__inputs">
        <label htmlFor="estimate-name" className="new-material-form__label">
          Nazwa kosztorysu
        </label>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          name="estimate-name"
          id="estimate-name"
          className={clsx("new-material-form__input", {
            "new-material-form__input--error": getErrorStatus("name"),
          })}
          placeholder="Wprowadź nazwę kosztorysu.."
        />
      </div>

      <div className="new-material-form__actions">
        <Button variant="INVISIBLE" text="Anuluj" onPress={onCancel} />
        <Button
          variant="FILLED"
          text="Zatwierdź"
          buttonType={{ type: "submit" }}
          onPress={() => {}}
        />
      </div>
    </form>
  );
};
