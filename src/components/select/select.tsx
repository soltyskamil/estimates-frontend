import { CaretDownOutlined } from "@ant-design/icons";
import "./select.scss";
import { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import { useOnClickAway } from "src/hooks/useOnClickAway";
import type { sortBy, sortDir } from "src/context/estimate-context";
import type { EstimateItemTypeEnum } from "src/types/estimates.types";
export type OptionType = {
  value: sortDir | sortBy | EstimateItemTypeEnum;
  text: string;
};

type SelectProps = {
  options: OptionType[];
  onActiveOption: (op: OptionType) => void;
  changeName?: boolean;
  name: string;
};

const Select = ({ options, onActiveOption, name, changeName }: SelectProps) => {
  const [activeOption, setActiveOption] = useState<OptionType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const expandableRef = useRef<HTMLDivElement>(null);

  const toggleSelect = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const handleActiveOption = useCallback((option: OptionType) => {
    setActiveOption((p) => (p === option ? null : option));
    onActiveOption(option);
    toggleSelect();
  }, []);

  useOnClickAway({
    ref: expandableRef,
    parentRef: selectRef,
    onAwayCallback: toggleSelect,
    doWhile: isOpen,
  });

  return (
    <div className={"select"} ref={selectRef}>
      <button
        className={clsx("select__button", { "select__button--open": isOpen })}
        onClick={toggleSelect}
      >
        {activeOption && changeName ? activeOption.text : name}
        <CaretDownOutlined className="select__icon" />
      </button>
      <div
        className={clsx("select__expandable", {
          "select__expandable--open": isOpen,
        })}
        ref={expandableRef}
      >
        {options.map((o, i) => (
          <button
            onClick={() => handleActiveOption(o)}
            className="select__option"
            key={`se-${o.value}-${i}`}
          >
            {o.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
