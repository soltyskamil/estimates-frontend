import { EditOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./estimate-single-name.scss";
type EstimateSingleNameProps = {
  name: string;
  onSubmit: (name: string) => void;
};

const EstimateSingleName = ({ name, onSubmit }: EstimateSingleNameProps) => {
  const [inputValue, setInputValue] = useState(name);
  const [editing, setEditing] = useState(false);

  const toggleForm = useCallback(() => {
    setEditing((e) => !e);
  }, [editing]);

  const handleFormChange = useCallback(
    (name: string) => setInputValue(name),
    []
  );

  const didChange = useMemo(
    () => JSON.stringify(name) !== JSON.stringify(inputValue),
    [name, inputValue]
  );

  useEffect(() => {
    if (!editing && didChange) {
      onSubmit(inputValue);
    }
  }, [editing, didChange, inputValue]);

  return (
    <form
      className="estimate-name"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="estimate-name__edit">
        {editing ? (
          <input
            id="estimate-name"
            name="estimate-name"
            value={inputValue}
            onChange={(e) => handleFormChange(e.target.value)}
          />
        ) : (
          <h2 className="estimate-name__label">{name}</h2>
        )}
      </div>

      <EditOutlined
        className="estimate-name__toggle"
        style={{ fontSize: "24px" }}
        onClick={toggleForm}
      />
    </form>
  );
};

export default EstimateSingleName;
