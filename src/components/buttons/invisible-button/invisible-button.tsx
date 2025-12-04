import clsx from "clsx";
import { getButtonClass } from "../utils/button-utils";
import "./button.scss";
import type { ButtonHTMLAttributes, CSSProperties } from "react";
export type ButtonVariants = "INVISIBLE" | "FILLED" | "OUTLINED";

type ButtonProps = {
  onPress: () => void;
  text: string;
  variant: ButtonVariants;
  icon?: React.ReactNode;
  passedStyles?: CSSProperties;
  buttonType?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export const Button = ({
  passedStyles,
  onPress,
  text,
  variant,
  icon,
  buttonType,
}: ButtonProps) => {
  const buttonClass = getButtonClass(variant);
  const type = buttonType ?? ("button" as any);

  return (
    <button
      type={type}
      className={clsx("button", `button--${buttonClass}`)}
      onClick={onPress}
      style={passedStyles}
    >
      {icon}
      {text}
    </button>
  );
};
