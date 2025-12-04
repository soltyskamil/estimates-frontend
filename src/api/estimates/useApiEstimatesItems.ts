import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import estimatesService from "../services/estimatesService";
import type {
  AddItemToEstimateBody,
  AddItemToEstimateParams,
  DeleteItemFromEstimateParams,
  EditItemFromEstimateBody,
  EditItemFromEstimateParams,
  GetEstimateItemsParams,
} from "src/types/estimates.types";

export const useGetEstimateItems = (params: GetEstimateItemsParams) => {
  const {
    data: estimateItems,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["estimate", "items", "single", params.estimateId],
    queryFn: async () => {
      const res = await estimatesService.getEstimateItems(params);
      return res.data;
    },
  });

  return {
    estimateItems,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useAddEstimateItem = () => {
  const qc = useQueryClient();

  const {
    mutateAsync: addEstimateItemAsync,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationKey: ["estimate", "items", "add"],
    mutationFn: async ({
      params,
      body,
    }: {
      params: AddItemToEstimateParams;
      body: AddItemToEstimateBody;
    }) => {
      const res = await estimatesService.addEstimateItems(params, body);
      return res.data;
    },
    onSuccess: (params) => {
      qc.invalidateQueries({
        queryKey: ["estimate", "single", params._id],
      });
    },
  });

  return {
    addEstimateItemAsync,
    isPending,
    isError,
    isSuccess,
  };
};

export const useEditEstimateItem = () => {
  const qc = useQueryClient();
  const {
    mutateAsync: editEstimateItemAsync,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationKey: ["estimate", "items", "edit"],
    mutationFn: async ({
      params,
      body,
    }: {
      params: EditItemFromEstimateParams;
      body: EditItemFromEstimateBody;
    }) => {
      const res = await estimatesService.editEstimateItem(params, body);
      return res.data;
    },
    onSuccess: (params) => {
      qc.invalidateQueries({
        queryKey: ["estimate", "single", params._id],
      });
    },
  });

  return {
    editEstimateItemAsync,
    isPending,
    isError,
    isSuccess,
  };
};

export const useDeleteEstimateItem = () => {
  const qc = useQueryClient();

  const {
    mutateAsync: deleteEstimateItemAsync,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationKey: ["estimate", "items", "delete"],
    mutationFn: async ({
      params,
    }: {
      params: DeleteItemFromEstimateParams;
    }) => {
      const res = await estimatesService.deleteEstimateItem(params);
      return res.data;
    },
    onSuccess: async (params) => {
      qc.invalidateQueries({ queryKey: ["estimate", "single", params._id] });
    },
  });

  return {
    deleteEstimateItemAsync,
    isPending,
    isError,
    isSuccess,
  };
};
