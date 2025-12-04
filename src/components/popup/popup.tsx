import { CloseOutlined } from "@ant-design/icons";
import "./popup.scss";
import { usePopupContext } from "src/context/popup-context";
import { createPortal } from "react-dom";

export const Popup = () => {
  const { openedPopup, closePopup } = usePopupContext();

  if (!openedPopup) return null;

  const { title, body } = openedPopup;

  return createPortal(
    <>
      <div className="overlay" />
      <div className="popup">
        <div className="popup__header">
          <h3 className="popup__title">{title}</h3>
          <button className="popup__close" onClick={closePopup}>
            <CloseOutlined style={{ fontSize: "18px" }} />
          </button>
        </div>
        <div className="popup__inner">{body}</div>
      </div>
    </>,
    document.body
  );
};
