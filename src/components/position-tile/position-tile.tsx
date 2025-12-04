import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import "./position-tile.scss";
import type { CSSProperties } from "react";
import type { EstimateItem } from "src/types/estimates.types";
type PositionTileProps = {
  data: EstimateItem & { position: number };
  passedStyles?: CSSProperties;
};

export const PositionTile = ({ data, passedStyles }: PositionTileProps) => {
  return (
    <div className="position-tile" style={passedStyles}>
      <p className="position-tile__number">{data.position}</p>
      <div className="position-tile__inner">
        <div className="position-tile__type">{data.type}</div>
        <h4 className="position-tile__name">{data.name}</h4>
        <div className="position-tile__details">
          <div className="position-tile__quantity">
            <span className="position-tile__label position-tile__label--xsgray">
              Ilość
            </span>
            <span className="position-tile__label position-tile__label--xs">
              {data.quantity}szt.
            </span>
          </div>
          <div className="position-tile__unitprice">
            <span className="position-tile__label position-tile__label--xsgray">
              Cena jedn:
            </span>
            <span className="position-tile__label position-tile__label--xs">
              {data.unitPrice}zł.
            </span>
          </div>
        </div>
        <div className="position-tile__total">
          <span className="position-tile__label position-tile__label--gray">
            Wartość:
          </span>
          <span className="position-tile__label">
            {data.unitPrice && data.quantity && data.unitPrice * data.quantity}
            zł.
          </span>
        </div>
      </div>
      <div className="position-tile__outer">
        <DeleteOutlined style={{ color: "red" }} />
        <EditOutlined style={{ color: "var(--blue-600)" }} />
      </div>
    </div>
  );
};
