import clsx from "clsx";
import { getButtonClass } from "../utils/button-utils";
import "./button.scss";
import type { CSSProperties } from "react";
export type ButtonVariants = "INVISIBLE" | "FILLED" | "OUTLINED";

type ButtonProps = {
  onPress: () => void;
  text: string;
  variant: ButtonVariants;
  icon?: React.ReactNode;
  passedStyles?: CSSProperties;
};

export const Button = ({
  passedStyles,
  onPress,
  text,
  variant,
  icon,
}: ButtonProps) => {
  const buttonClass = getButtonClass(variant);

  return (
    <button
      className={clsx("button", `button--${buttonClass}`)}
      onClick={onPress}
      style={passedStyles}
    >
      {icon}
      {text}
    </button>
  );
};
