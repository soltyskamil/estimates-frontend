import "./estimates-table.scss";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { EstimatesTile } from "../estimates-tile/estimates-tile";

import { useNavigate } from "react-router-dom";
import {
  useDeleteEstimate,
  useGetEstimates,
} from "src/api/estimates/useApiEstimates";
import { useEstimateState } from "src/context/estimate-context";
import { useDebouncedValue } from "src/hooks/useDebouncedValue";

export const TABLE_BREAKPOINT = 740;

export const EstimatesTable = () => {
  const { queryState } = useEstimateState();
  const { debouncedValue } = useDebouncedValue({
    value: queryState.search,
    delay: 250,
  });

  const { estimatesList, isLoading, isError } = useGetEstimates({
    search: debouncedValue,
    sortBy: queryState.sortBy ?? undefined,
    sortDir: queryState.sortDir ?? undefined,
  });

  const { deleteEstimateAsync } = useDeleteEstimate();

  const navigate = useNavigate();

  const [displayTable, setDisplayTable] = useState(
    window.innerWidth >= TABLE_BREAKPOINT
  );
  const { width } = useWindowSize();

  const onDelete = useCallback(async (estimateId: string) => {
    await deleteEstimateAsync({ estimateId });
  }, []);

  const onView = useCallback((estimateId: string) => {
    navigate(`/dashboard/estimates/${estimateId}`);
  }, []);

  useEffect(() => {
    if (!width) return;
    if (width >= TABLE_BREAKPOINT && !displayTable) setDisplayTable(true);
    if (width <= TABLE_BREAKPOINT && displayTable) setDisplayTable(false);
  }, [width]);

  if (isError || !estimatesList) return null;
  if (isLoading) return <span>ładowanie...</span>;

  const { data } = estimatesList!;

  const totalValueOfEstimates = () => (
    <p className="estimates-total">
      Wartość całkowita kosztorysów:
      {estimatesList?.meta.totalValueOfEstimates}zł
    </p>
  );

  if (!displayTable)
    return (
      <div className="estimates-tiles">
        {data.map((esp) => {
          const date = new Date(esp.createdAt)
            .toLocaleDateString()
            .replaceAll("/", ".");
          const priceFixed = esp.totalValue.toFixed(2).replace(".", ",");

          return (
            <EstimatesTile
              onDelete={onDelete}
              onView={onView}
              key={`esp-${esp._id}`}
              estimateData={{ ...esp, createdAt: date, totalValue: priceFixed }}
            />
          );
        })}
        {totalValueOfEstimates()}
      </div>
    );

  return (
    <div className="estimates-table-wrapper">
      <table className="estimates-table">
        <thead className="estimates-table__head">
          <tr className="estimates-table__row">
            <th className="estimates-table__th">Nazwa kosztorysu</th>
            <th className="estimates-table__th">Data utworzenia</th>
            <th className="estimates-table__th">Suma całkowita (zł)</th>
            <th className="estimates-table__th">Akcje</th>
          </tr>
        </thead>
        <tbody className="estimates-table__body">
          {data.map((esd) => {
            const date = new Date(esd.createdAt)
              .toLocaleDateString()
              .replaceAll("/", ".");
            const priceFixed = esd.totalValue.toFixed(2).replace(".", ",");

            return (
              <tr className="estimates-table__row" key={`esd-${esd._id}`}>
                <td className="estimates-table__name">{esd.name}</td>
                <td className="estimates-table__date">{date}</td>
                <td className="estimates-table__value">{priceFixed}zł</td>
                <td className="estimates-table__actions">
                  <EyeOutlined
                    style={{ color: "var(--blue-600)" }}
                    onClick={() => onView(esd._id)}
                  />
                  <DeleteOutlined
                    style={{ color: "red" }}
                    onClick={() => onDelete(esd._id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {totalValueOfEstimates()}
    </div>
  );
};
