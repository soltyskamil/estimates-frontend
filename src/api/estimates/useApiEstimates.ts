import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import estimatesService from "../services/estimatesService";
import type {
  AddEstimateParams,
  DeleteEstimateParams,
  EditEstimateNameParams,
} from "src/types/estimates.types";

export const useGetEstimates = () => {
  const {
    data: estimatesList,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["estimates", "list"],
    queryFn: async () => {
      const res = await estimatesService.getAllEstimates();
      return res;
    },
  });

  return {
    estimatesList,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useGetSingleEstimate = (estimateId: string) => {
  const {
    data: estimate,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["estimate", "single", estimateId],
    queryFn: async () => {
      const res = await estimatesService.getSingleEstimate({ estimateId });
      return res.data;
    },
  });

  return {
    estimate,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useAddEstimate = () => {
  const qc = useQueryClient();
  const {
    mutateAsync: addEstimateAsync,
    isSuccess,
    isError,
    isPending,
  } = useMutation({
    mutationKey: ["estimate", "add"],
    mutationFn: async (params: AddEstimateParams) => {
      const res = await estimatesService.addEstimate(params);
      return res;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["estimates", "list"] });
    },
  });

  return {
    addEstimateAsync,
    isSuccess,
    isError,
    isPending,
  };
};

export const useDeleteEstimate = () => {
  const qc = useQueryClient();
  const {
    mutateAsync: deleteEstimateAsync,
    isSuccess,
    isError,
    isPending,
  } = useMutation({
    mutationKey: ["estimate", "delete"],
    mutationFn: async (params: DeleteEstimateParams) => {
      const res = await estimatesService.deleteEstimate(params);
      return res;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["estimates", "list"] });
    },
  });

  return {
    deleteEstimateAsync,
    isSuccess,
    isError,
    isPending,
  };
};

export const useEditEstimateName = () => {
  const qc = useQueryClient();
  const {
    mutateAsync: editEstimateNameAsync,
    isSuccess,
    isError,
    isPending,
  } = useMutation({
    mutationKey: ["estimate", "edit", "name"],
    mutationFn: async (params: EditEstimateNameParams) => {
      const res = await estimatesService.editEstimateName(params);
      return res;
    },
    onSuccess: ({ data }) => {
      qc.invalidateQueries({
        queryKey: ["estimate", "single", data._id],
      });
    },
  });

  return {
    editEstimateNameAsync,
    isSuccess,
    isError,
    isPending,
  };
};
