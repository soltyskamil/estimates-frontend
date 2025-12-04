import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { Popup } from "src/components/popup/popup";

type PopupTypes = "NEW-ESTIMATE" | "MATERIAL" | "SERVICE";

type PopupState = {
  type: PopupTypes;
  title: string;
  body: React.ReactNode;
};

type PopupContext = {
  openedPopup: PopupState | null;
  openPopup: (state: PopupState) => void;
  closePopup: () => void;
};

const PopupContext = createContext<PopupContext | null>(null);

export const PopupContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [openedPopup, setOpenedPopup] = useState<PopupState | null>(null);

  const disableBodyScroll = useCallback(
    () => (document.body.style.overflow = "hidden"),
    []
  );

  const enableBodyScroll = useCallback(
    () => (document.body.style.overflow = "auto"),
    []
  );
  const openPopup = useCallback((state: PopupState) => {
    setOpenedPopup(state);
    disableBodyScroll();
  }, []);
  const closePopup = useCallback(() => {
    setOpenedPopup(null);
    enableBodyScroll();
  }, []);

  const state = useMemo(
    () => ({ openPopup, closePopup, openedPopup }),
    [openPopup, closePopup, openedPopup]
  );

  return (
    <PopupContext.Provider value={state}>
      {children}
      <Popup />
    </PopupContext.Provider>
  );
};

export const usePopupContext = () => {
  const ctx = useContext(PopupContext);
  if (!ctx)
    throw new Error("Wystąpił błąd podczas korzystania z kontekstu popup");
  return ctx;
};
