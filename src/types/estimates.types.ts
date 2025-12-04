export interface Pageable {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}
export type Estimate = {
  _id: string;
  name: string;
  totalValue: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface QuerySortPageableParams {
  search?: string;
  sortDir?: "desc" | "asc";
  page?: number;
  limit?: number;
}

export const EstimateItemEnum = {
  MATERIAL: "MATERIAL",
  SERVICE: "SERVICE",
} as const;

export const EstimateItemMaterialUnitsEnum = {
  PIECE: "PIECE",
  SQRM: "SQRM",
  BAG: "BAG",
  LM: "LM",
} as const;

export type EstimateItemTypeEnum =
  (typeof EstimateItemEnum)[keyof typeof EstimateItemEnum];

export type EstimateItemMaterialUnitsTypeEnum =
  (typeof EstimateItemMaterialUnitsEnum)[keyof typeof EstimateItemMaterialUnitsEnum];

export type EstimateItem = {
  name: string;
  type: EstimateItemTypeEnum;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  quantity?: number;
  unit?: EstimateItemMaterialUnitsTypeEnum;
  unitPrice?: number;
  _id: string;
};

export type EstimateWithItems = Estimate & {
  items: EstimateItem[];
};

export interface EstimateListResponse {
  data: Estimate[];
  meta: Pageable;
  success: boolean;
}

export interface EstimateSingleParams {
  estimateId: string;
}

export interface EstimateSingleResponse {
  success: boolean;
  data: EstimateWithItems;
}

export interface AddEstimateParams {
  name: string;
}

export interface AddEstimateResponse {
  success: boolean;
  data: EstimateWithItems;
}

export interface DeleteEstimateParams {
  estimateId: string;
}

export interface DeleteEstimateResponse {
  success: boolean;
  data: string;
}

export interface EditEstimateNameParams {
  estimateId: string;
  name: string;
}

export interface EditEstimateNameResponse {
  success: boolean;
  data: EstimateWithItems;
}

export interface GetEstimateItemsParams {
  estimateId: string;
  page?: number;
  limit?: number;
}

export interface GetEstimateItemsResponse {
  data: {
    items: EstimateWithItems;
    meta: Pageable;
  };

  success: boolean;
}

export interface AddItemToEstimateParams {
  estimateId: string;
}

export type AddItemToEstimateBody = {
  name: string;
  type: EstimateItemTypeEnum;
  totalPrice: number;
  quantity?: number;
  unit?: EstimateItemMaterialUnitsTypeEnum;
  unitPrice?: number;
};

export interface AddItemToEstimateResponse {
  success: boolean;
  data: EstimateWithItems;
}

export interface DeleteItemFromEstimateParams {
  estimateId: string;
  itemId: string;
}

export interface DeleteItemFromEstimateResponse {
  data: EstimateWithItems;
  success: boolean;
}

export interface EditItemFromEstimateParams {
  estimateId: string;
  itemId: string;
}

export type EditItemFromEstimateBody = AddItemToEstimateBody;

export interface EditItemFromEstimateResponse {
  data: EstimateWithItems;
  success: boolean;
}
