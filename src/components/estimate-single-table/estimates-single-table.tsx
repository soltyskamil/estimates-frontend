import { useWindowSize } from "@uidotdev/usehooks";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { TABLE_BREAKPOINT } from "../estimates-table/estimates-table";
import type { EstimateItemType } from "src/mock_data/estimates";
import "./estimates-single-table.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { PositionTile } from "../position-tile/position-tile";
import { usePopupContext } from "src/context/popup-context";
import { PositionForm } from "../forms/position-form/position-form";
import ServiceForm from "../forms/service-form/service-form";
import type {
  EditItemFromEstimateBody,
  EstimateItem,
  EstimateWithItems,
} from "src/types/estimates.types";
import {
  useDeleteEstimateItem,
  useEditEstimateItem,
} from "src/api/estimates/useApiEstimatesItems";
type EstimateSingleTableProps = {
  data: EstimateWithItems;
};

export const EstimatesSingleTable = ({ data }: EstimateSingleTableProps) => {
  const { width } = useWindowSize();
  const { openPopup, closePopup } = usePopupContext();
  const { deleteEstimateItemAsync } = useDeleteEstimateItem();
  const { editEstimateItemAsync } = useEditEstimateItem();

  const [displayTable, setDisplayTable] = useState(
    window.innerWidth >= TABLE_BREAKPOINT
  );

  useEffect(() => {
    if (!width) return;
    if (width >= TABLE_BREAKPOINT && !displayTable) setDisplayTable(true);
    if (width <= TABLE_BREAKPOINT && displayTable) setDisplayTable(false);
  }, [width]);

  const handlePopup = useCallback(
    <K extends EstimateItemType>(key: K, data: EstimateItem, esId: string) => {
      console.log(data._id, esId);
      switch (key) {
        case "MATERIAL":
          openPopup({
            title: "Edytuj material",
            body: (
              <PositionForm
                onSubmit={async (body: EditItemFromEstimateBody) => {
                  await editEstimateItemAsync({
                    params: { estimateId: esId, itemId: data._id },
                    body,
                  });
                  closePopup();
                }}
                onCancel={closePopup}
                data={{
                  name: data.name,
                  totalPrice: data.totalPrice,
                  type: "MATERIAL",
                  quantity: data.quantity ?? 0,
                  unit: data.unit ?? "SQRM",
                  unitPrice: data.unitPrice ?? 0,
                }}
              />
            ),
            type: "MATERIAL",
          });
          break;
        case "SERVICE":
          openPopup({
            title: "Edytuj usługę",
            body: (
              <ServiceForm
                onSubmit={async (body) => {
                  await editEstimateItemAsync({
                    params: { estimateId: esId, itemId: data._id },
                    body,
                  });
                  closePopup();
                }}
                onCancel={closePopup}
                data={{
                  name: data.name,
                  totalPrice: data.totalPrice ?? 0,
                  type: "SERVICE",
                }}
              />
            ),
            type: "MATERIAL",
          });
          break;
        default:
          return;
      }
    },
    []
  );

  if (!displayTable)
    return (
      <div className="estimate-tiles">
        {data.items!.map((v, i) => {
          const borderBottom: CSSProperties | undefined =
            i < data.items!.length - 1
              ? { borderBottom: "1px solid var(--gray-400)" }
              : undefined;

          return (
            <PositionTile
              key={`v-${i}`}
              data={{ ...v, position: i + 1 }}
              passedStyles={borderBottom}
              onDelete={async () => {
                await deleteEstimateItemAsync({
                  params: { estimateId: data._id, itemId: v._id },
                });
              }}
              onEdit={() => handlePopup(v.type, v, data._id)}
            />
          );
        })}
      </div>
    );

  return (
    <table className="estimate-table">
      <thead className="estimate-table__head">
        <tr className="estimate-table__row">
          <th className="estimate-table__th">Lp.</th>
          <th className="estimate-table__th">Typ</th>
          <th className="estimate-table__th">Nazwa</th>
          <th className="estimate-table__th">Ilość</th>
          <th className="estimate-table__th">Jednostka</th>
          <th className="estimate-table__th">Cena jedn. netto</th>
          <th className="estimate-table__th">Wartość</th>
          <th className="estimate-table__th">Akcje</th>
        </tr>
      </thead>
      <tbody className="estimate-table__body">
        {data.items!.map((v, i) => {
          return (
            <tr className="estimate-table__row" key={`${v._id}-${i}`}>
              <td className="estimate-table__position">{i + 1}</td>
              <td className="estimate-table__type">{v.type}</td>
              <td className="estimate-table__name">{v.name}</td>
              <td className="estimate-table__quantity">{v.quantity}</td>
              <td className="estimate-table__unit">{v.unit}</td>
              <td className="estimate-table__unitprice">{v.unitPrice}</td>
              <td className="estimate-table__value">{v.totalPrice}</td>
              <td className="estimate-table__actions">
                <DeleteOutlined
                  style={{ color: "red" }}
                  onClick={async () => {
                    await deleteEstimateItemAsync({
                      params: { estimateId: data._id, itemId: v._id },
                    });
                  }}
                />
                <EditOutlined
                  style={{ color: "var(--blue-600)" }}
                  onClick={() => handlePopup(v.type, v, data._id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
