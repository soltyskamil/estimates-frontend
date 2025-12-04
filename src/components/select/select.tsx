import { CaretDownOutlined } from "@ant-design/icons";
import "./select.scss";
import { useCallback, useRef, useState, type CSSProperties } from "react";
import clsx from "clsx";
import { useOnClickAway } from "src/hooks/useOnClickAway";

export type OptionType<T> = {
  value: T;
  text: string;
};

export type WithValueText = {
  value: string;
  text: string;
};

type SelectProps<T extends WithValueText> = {
  options: T[];
  onActiveOption: (op: T) => void;
  changeName?: boolean;
  name: string;
  passedOption?: T;
  passedStyles?: CSSProperties;
};

const Select = <T extends WithValueText>({
  options,
  onActiveOption,
  name,
  changeName,
  passedOption,
  passedStyles,
}: SelectProps<T>) => {
  const [activeOption, setActiveOption] = useState<T | null>(() =>
    passedOption ? passedOption : null
  );
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const expandableRef = useRef<HTMLDivElement>(null);

  const toggleSelect = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const handleActiveOption = useCallback((option: T) => {
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
        type="button"
        className={clsx("select__button", { "select__button--open": isOpen })}
        onClick={toggleSelect}
        role="option"
        style={passedStyles}
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
            type="button"
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
