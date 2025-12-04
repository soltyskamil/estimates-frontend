import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import type { EstimateDataProps } from "src/mock_data/estimates";
import "./estimates-tile.scss";
type FormattedEstimate = Omit<
  EstimateDataProps,
  "createdAt" | "totalValue" | "items"
> & {
  createdAt: string;
  totalValue: string;
};

type EstimateTileProps = {
  estimateData: FormattedEstimate;
  onView: (estimateId: string) => void;
  onDelete: (estimateId: string) => void;
};

export const EstimatesTile = ({
  estimateData,
  onDelete,
  onView,
}: EstimateTileProps) => {
  return (
    <div className="estimates-tile">
      <div className="estimates-tile__inner">
        <h3 className="estimates-tile__name">{estimateData.name}</h3>
        <p className="estimates-tile__date">{estimateData.createdAt}</p>
      </div>
      <div className="estimates-tile__outer">
        <div className="estimates-tile__value">
          <p className="estimates-tile__label">Suma całkowita</p>
          <p className="estimates-tile__total">{estimateData.totalValue}</p>
        </div>
        <div className="estimates-tile__actions">
          <EyeOutlined
            style={{ color: "var(--blue-600)" }}
            onClick={() => onView(estimateData._id)}
          />
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => onDelete(estimateData._id)}
          />
        </div>
      </div>
    </div>
  );
};
