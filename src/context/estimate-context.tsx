import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { PositionFormData } from "src/components/forms/position-form/position-form";
import type { ServiceFormData } from "src/components/forms/service-form/service-form";
import type { OptionType } from "src/components/select/select";
import {
  MOCK_ESTIMATES,
  type EstimateDataProps,
} from "src/mock_data/estimates";

type EstimateContextState = {
  data: EstimateDataProps[];
};

type EstimateContextActions = {
  sortEstimates: (ot: OptionType) => void;
  filterEstimates: (v: string) => void;
  addEstimate: (estimateName: string) => void;
  deleteEstimate: (estimateId: string) => void;
  getEstimate: (estimateId: string) => EstimateDataProps | null;
  viewEstimate: () => void;
  deleteEstimatePosition: (estimateId: string, positionId: number) => void;
  editEstimatePosition: (
    estimateId: string,
    positionId: number,
    formData: PositionFormData | ServiceFormData
  ) => void;
  editEstimateName: (estimateId: string, newName: string) => void;
  addNewService: (estimateId: string, formData: ServiceFormData) => void;
  addNewMaterial: (estimateId: string, formData: PositionFormData) => void;
};

const EstimateContextState = createContext<EstimateContextState | null>(null);
const EstimateContextActions = createContext<EstimateContextActions | null>(
  null
);

export const EstimateContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [data, setData] = useState<EstimateDataProps[]>(MOCK_ESTIMATES);

  const getEstimate = useCallback(
    (estimateId: string) => {
      return data.find((e) => e._id === estimateId) ?? null;
    },
    [data]
  );

  const deleteEstimate = useCallback(
    (estimateId: string) => {
      setData((p) => p.filter((v) => v._id !== estimateId));
    },
    [data]
  );
  const addEstimate = useCallback(
    (estimateName: string) => {
      const newEstimate: EstimateDataProps = {
        name: estimateName,
        _id: data.length.toString(),
        createdAt: new Date(),
        items: null,
        totalValue: 0,
      };

      setData((p) => [...p, newEstimate]);
    },
    [data.length]
  );
  const viewEstimate = useCallback(() => {}, []);

  const getEstimatePosition = useCallback(
    (estimateId: string, positionId: number) => {
      const es = data.find((v) => v._id === estimateId);
      if (!es) return null;
      const pos = es.items;
      if (!pos) return null;

      return pos.find((v) => v.id === positionId);
    },
    [data]
  );

  const editEstimatePosition = useCallback(
    (
      estimateId: string,
      positionId: number,
      formData: PositionFormData | ServiceFormData
    ) => {
      const pos = getEstimatePosition(estimateId, positionId);
      const estimate = getEstimate(estimateId);
      if (!pos || !estimate) return;
      const items = (estimate.items ?? []).map((v) =>
        v.id === pos.id ? { ...pos, ...formData } : v
      );

      setData((p) =>
        p.map((v) => (v._id === estimate._id ? { ...estimate, items } : v))
      );
    },
    [getEstimate, getEstimatePosition]
  );

  const editEstimateName = useCallback(
    (estimateId: string, newName: string) => {
      const estimate = getEstimate(estimateId);
      if (!estimate) return;

      setData((p) =>
        p.map((v) =>
          v._id === estimate._id ? { ...estimate, name: newName } : v
        )
      );
    },
    [data]
  );

  const deleteEstimatePosition = useCallback(
    (estimateId: string, positionId: number) => {
      const estimate = data.find((v) => v._id === estimateId);
      if (!estimate) return;
      const estimatePositions = estimate.items && estimate.items.slice();

      if (!estimatePositions) return;

      const estimatePos = estimatePositions.filter(
        (pos) => pos.id !== positionId
      );

      setData((p) =>
        p.map((v) =>
          v._id === estimateId ? { ...estimate, items: estimatePos } : v
        )
      );
    },
    [data]
  );

  const filterEstimates = useCallback(
    (v: string) => {
      const sliced = data.slice();
      setData(sliced.filter((esp) => esp.name.includes(v)));
    },
    [data]
  );

  const calculateMaterialValue = useCallback(
    (unitPrice: number, quantity: number) => unitPrice * quantity,
    []
  );

  const calculateServiceValue = useCallback((value: number) => value, []);

  const addNewMaterial = useCallback(
    (esId: string, formData: PositionFormData) => {
      const es = getEstimate(esId);
      if (!es) return;

      setData((p) =>
        p.map((v) =>
          v._id === es._id
            ? {
                ...v,
                items: (v.items ?? []).concat({
                  ...formData,
                  type: "MATERIAL",
                  value: calculateMaterialValue(
                    formData.unitPrice,
                    formData.quantity
                  ),
                  id: Math.random(),
                }),
              }
            : v
        )
      );
    },
    [data, getEstimate]
  );

  const addNewService = useCallback(
    (esId: string, formData: ServiceFormData) => {
      const es = getEstimate(esId);
      if (!es) return;

      setData((p) =>
        p.map((v) =>
          v._id === es._id
            ? {
                ...v,
                items: (v.items ?? []).concat({
                  ...formData,
                  type: "SERVICE",
                  id: Math.random(),
                  value: calculateServiceValue(formData.value),
                }),
              }
            : v
        )
      );
    },
    [data, getEstimate]
  );

  const sortEstimates = useCallback(
    (ot: OptionType) => {
      const sliced = data.slice();
      switch (ot.value) {
        case "date":
          setData(
            sliced.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
          );
          break;
        case "name":
          setData(sliced.sort((a, b) => a.name.localeCompare(b.name)));
          break;
        case "suma":
          setData(sliced.sort((a, b) => a.totalValue - b.totalValue));
          break;
      }
    },
    [data]
  );

  const state = useMemo(() => ({ data }), [data]);

  const actions = useMemo(
    () => ({
      addNewMaterial,
      addNewService,
      deleteEstimate,
      addEstimate,
      viewEstimate,
      filterEstimates,
      sortEstimates,
      getEstimate,
      editEstimatePosition,
      deleteEstimatePosition,
      editEstimateName,
    }),
    [
      editEstimateName,
      addNewMaterial,
      addNewService,
      editEstimatePosition,
      deleteEstimatePosition,
      deleteEstimate,
      addEstimate,
      viewEstimate,
      getEstimate,
      filterEstimates,
      sortEstimates,
    ]
  );

  return (
    <EstimateContextState.Provider value={state}>
      <EstimateContextActions value={actions}>
        {children}
      </EstimateContextActions>
    </EstimateContextState.Provider>
  );
};

export const useEstimateState = () => {
  const ctx = useContext(EstimateContextState);
  if (!ctx)
    throw new Error("Wystąpił błąd podczas próby skorzystania z kontekstu");
  return ctx;
};
export const useEstimateActions = () => {
  const ctx = useContext(EstimateContextActions);
  if (!ctx)
    throw new Error("Wystąpił błąd podczas próby skorzystania z kontekstu");
  return ctx;
};
