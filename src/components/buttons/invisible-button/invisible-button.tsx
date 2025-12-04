import clsx from "clsx";
import { getButtonClass } from "../utils/button-utils";
import "./button.scss";
export type ButtonVariants = "INVISIBLE" | "FILLED" | "OUTLINED";

type ButtonProps = {
  onPress: () => void;
  text: string;
  variant: ButtonVariants;
  icon?: React.ReactNode;
};

export const Button = ({ onPress, text, variant, icon }: ButtonProps) => {
  const buttonClass = getButtonClass(variant);

  return (
    <button
      className={clsx("button", `button--${buttonClass}`)}
      onClick={onPress}
    >
      {icon}
      {text}
    </button>
  );
};
