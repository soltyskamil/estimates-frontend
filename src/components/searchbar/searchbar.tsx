import { SearchOutlined } from "@ant-design/icons";
import "./searchbar.scss";
import { useEstimateActions } from "src/context/estimate-context";
import { memo, useCallback, useEffect, useState } from "react";
type EstimateSearchbar = {
  searchFor: string;
};
type Searchbarprops = {
  searchFor: string;
  onChange: (v: string) => void;
  value: string;
};

export const EstimateSearchbar = ({ searchFor }: EstimateSearchbar) => {
  const { searchEstimates } = useEstimateActions();
  const [inputValue, setInputValue] = useState("");

  const onInputChange = useCallback((v: string) => setInputValue(v), []);

  useEffect(() => {
    searchEstimates(inputValue);
  }, [inputValue]);

  return (
    <Searchbar
      searchFor={searchFor}
      value={inputValue}
      onChange={onInputChange}
    />
  );
};

const Searchbar = memo(({ searchFor, value, onChange }: Searchbarprops) => {
  return (
    <div className="searchbar">
      <SearchOutlined
        style={{ fontSize: "18px" }}
        className="searchbar__icon"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Szukaj kosztorysu..."
        type="search"
        className="searchbar__input"
        name={searchFor}
        id={searchFor}
      />
    </div>
  );
});

export default Searchbar;
