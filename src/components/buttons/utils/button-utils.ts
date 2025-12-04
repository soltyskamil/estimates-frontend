import type { ButtonVariants } from "../invisible-button/invisible-button";

export const getButtonClass = (variant: ButtonVariants): string => {
  switch (variant) {
    case "INVISIBLE":
      return "invisible";
    case "FILLED":
      return "filled";
    case "OUTLINED":
      return "outlined";
    default:
      return "";
  }
};
