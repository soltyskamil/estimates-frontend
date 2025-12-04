import { useState } from "react";
import { Button } from "src/components/buttons/invisible-button/invisible-button";
import { useEstimateActions } from "src/context/estimate-context";
import "./new-material-form.scss";
type NewMaterialFormProps = {
  onSubmit: (estimateName: string) => void;
};

export const NewMaterialForm = ({ onSubmit }: NewMaterialFormProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <form
      action="POST"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(inputValue);
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
          className="new-material-form__input"
          placeholder="Wprowadź nazwę kosztorysu.."
        />
      </div>

      <div className="new-material-form__actions">
        <Button variant="INVISIBLE" text="Anuluj" onPress={() => null} />
        <Button variant="FILLED" text="Zatwierdź" onPress={() => null} />
      </div>
    </form>
  );
};
