import type {
  AddEstimateParams,
  AddEstimateResponse,
  AddItemToEstimateBody,
  AddItemToEstimateParams,
  AddItemToEstimateResponse,
  DeleteEstimateParams,
  DeleteEstimateResponse,
  DeleteItemFromEstimateParams,
  DeleteItemFromEstimateResponse,
  EditEstimateNameParams,
  EditEstimateNameResponse,
  EditItemFromEstimateBody,
  EditItemFromEstimateParams,
  EditItemFromEstimateResponse,
  EstimateListResponse,
  EstimateSingleParams,
  EstimateSingleResponse,
  GetEstimateItemsParams,
  GetEstimateItemsResponse,
  QuerySortPageableParams,
} from "src/types/estimates.types";
import axiosClient from "../client/axiosClient";

const ESTIMATES_API_URLS = {
  LIST: "/estimates",
  ADD_ESTIMATE: "/estimates/add",
  SINGLE_ESTIMATE: (estimateId: string) => `/estimates/${estimateId}`,
  EDIT_ESTIMATE_NAME: (estimateId: string) => `/estimates/${estimateId}/edit`,
  ESTIMATE_ITEMS_LIST: (estimateId: string) => `/estimates/${estimateId}/items`,
  ADD_ITEM_TO_ESTIMATE_ITEMS_LIST: (estimateId: string) =>
    `/estimates/${estimateId}/items/add`,
  DELETE_ITEM_FROM_ESTIMATE_ITEMS_LIST: (estimateId: string) =>
    `/estimates/${estimateId}/items/delete`,
  EDIT_ITEM_FROM_ESTIMATE_ITEMS_LIST: (estimateId: string) =>
    `/estimates/${estimateId}/items/edit`,
};

class EstimatesService {
  async getAllEstimates(params?: QuerySortPageableParams) {
    const fixedParams = (params?: QuerySortPageableParams) => {
      if (!params) return;
      const fixed = {} as QuerySortPageableParams;
      Object.assign(
        fixed,
        Object.fromEntries(Object.entries(params).filter(([_, v]) => !!v))
      );

      return fixed;
    };

    try {
      const res = await axiosClient.get<EstimateListResponse>(
        ESTIMATES_API_URLS.LIST,
        { params: fixedParams(params) }
      );
      return res.data;
    } catch (err) {
      throw new Error("Wystapil blad podczas pobierania kosztorysow");
    }
  }

  async getSingleEstimate(params: EstimateSingleParams) {
    try {
      const res = await axiosClient.get<EstimateSingleResponse>(
        ESTIMATES_API_URLS.SINGLE_ESTIMATE(params.estimateId)
      );
      return res.data;
    } catch (err) {
      throw new Error("Wystapil blad podczas pobierania kosztorysow");
    }
  }

  async addEstimate(params: AddEstimateParams) {
    try {
      const res = await axiosClient.post<AddEstimateResponse>(
        ESTIMATES_API_URLS.ADD_ESTIMATE,
        {},
        { params }
      );
      return res.data;
    } catch (err) {
      throw new Error("Wystapil blad podczas dodawania kosztorysu");
    }
  }

  async deleteEstimate(params: DeleteEstimateParams) {
    try {
      const res = await axiosClient.delete<DeleteEstimateResponse>(
        ESTIMATES_API_URLS.SINGLE_ESTIMATE(params.estimateId)
      );
      return res.data;
    } catch (err) {
      throw new Error("Wystapil blad podczas dodawania kosztorysu");
    }
  }

  async editEstimateName(params: EditEstimateNameParams) {
    try {
      const res = await axiosClient.patch<EditEstimateNameResponse>(
        ESTIMATES_API_URLS.EDIT_ESTIMATE_NAME(params.estimateId),
        {},
        {
          params: {
            name: params.name,
          },
        }
      );
      return res.data;
    } catch (err) {
      throw new Error("Wystapil blad podczas dodawania kosztorysu");
    }
  }

  //estimate items

  async getEstimateItems(params: GetEstimateItemsParams) {
    try {
      const res = await axiosClient.get<GetEstimateItemsResponse>(
        ESTIMATES_API_URLS.ESTIMATE_ITEMS_LIST(params.estimateId),
        { params }
      );
      return res.data;
    } catch (err) {
      throw new Error("Wystapil blad podczas dodawania kosztorysu");
    }
  }

  async addEstimateItems(
    params: AddItemToEstimateParams,
    body: AddItemToEstimateBody
  ) {
    try {
      const res = await axiosClient.post<AddItemToEstimateResponse>(
        ESTIMATES_API_URLS.ADD_ITEM_TO_ESTIMATE_ITEMS_LIST(params.estimateId),
        body
      );
      return res.data;
    } catch (err) {
      throw new Error("Wystapil blad podczas dodawania kosztorysu");
    }
  }

  async deleteEstimateItem(params: DeleteItemFromEstimateParams) {
    try {
      const res = await axiosClient.delete<DeleteItemFromEstimateResponse>(
        ESTIMATES_API_URLS.DELETE_ITEM_FROM_ESTIMATE_ITEMS_LIST(
          params.estimateId
        ),
        {
          params: {
            positionId: params.itemId,
          },
        }
      );
      return res.data;
    } catch (err) {
      throw new Error("Wystapil blad podczas dodawania kosztorysu");
    }
  }

  async editEstimateItem(
    params: EditItemFromEstimateParams,
    body: EditItemFromEstimateBody
  ) {
    try {
      console.log(params);
      const res = await axiosClient.patch<EditItemFromEstimateResponse>(
        ESTIMATES_API_URLS.EDIT_ITEM_FROM_ESTIMATE_ITEMS_LIST(
          params.estimateId
        ),
        body,
        {
          params: {
            positionId: params.itemId,
          },
        }
      );
      return res.data;
    } catch (err) {
      throw new Error("Wystapil blad podczas dodawania kosztorysu");
    }
  }
}

export default new EstimatesService();
