export type EstimateItemType = "MATERIAL" | "SERVICE";

export type EstimateItemsProps = {
  id: number;
  type: EstimateItemType;
  name: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  totalPrice?: number;
  value: number;
};

export type EstimateDataProps = {
  _id: string;
  name: string;
  createdAt: Date;
  items: EstimateItemsProps[] | null;
  totalValue: number;
};

export const MOCK_ESTIMATES: EstimateDataProps[] = [
  {
    _id: "674dca100000000000000001",
    name: "Remont mieszkania 65m² – Warszawa, ul. Słoneczna 12",
    createdAt: new Date("2025-11-20T09:30:00.000Z"),
    items: [
      {
        id: 1,
        type: "MATERIAL",
        name: "Cegła Porotherm 25",
        quantity: 12000,
        unit: "szt",
        unitPrice: 3.2,
        value: 38400,
      },
      {
        id: 2,
        type: "MATERIAL",
        name: "Gładź szpachlowa Atlas GTA 25kg",
        quantity: 40,
        unit: "worek",
        unitPrice: 38.5,
        value: 1540,
      },
      {
        id: 3,
        type: "SERVICE",
        name: "Malowanie ścian (2x)",
        totalPrice: 22000,
        value: 22000,
      },
      {
        id: 4,
        type: "SERVICE",
        name: "Układanie paneli podłogowych",
        totalPrice: 12500,
        value: 12500,
      },
    ],
    totalValue: 74440,
  },
  {
    _id: "674dca100000000000000002",
    name: "Budowa garażu murowanego 6x4m",
    createdAt: new Date("2025-11-15T11:10:00.000Z"),
    items: [
      {
        id: 1,
        type: "MATERIAL",
        name: "Bloczek betonowy 38x24x12",
        quantity: 900,
        unit: "szt",
        unitPrice: 4.1,
        value: 3690,
      },
      {
        id: 2,
        type: "MATERIAL",
        name: "Cement 25kg",
        quantity: 60,
        unit: "worek",
        unitPrice: 25,
        value: 1500,
      },
      {
        id: 3,
        type: "SERVICE",
        name: "Murowanie ścian z bloczków betonowych",
        totalPrice: 8500,
        value: 8500,
      },
      {
        id: 4,
        type: "SERVICE",
        name: "Wykonanie tynku zewnętrznego",
        totalPrice: 4200,
        value: 4200,
      },
    ],
    totalValue: 17890,
  },
  {
    _id: "674dca100000000000000003",
    name: "Adaptacja poddasza na pokój 25m²",
    createdAt: new Date("2025-11-10T08:45:00.000Z"),
    items: [
      {
        id: 1,
        type: "MATERIAL",
        name: "Płyta g-k 12,5mm",
        quantity: 60,
        unit: "szt",
        unitPrice: 32,
        value: 1920,
      },
      {
        id: 2,
        type: "MATERIAL",
        name: "Wełna mineralna Isover Uni-Mata 15cm",
        quantity: 15,
        unit: "rolka",
        unitPrice: 95,
        value: 1425,
      },
      {
        id: 3,
        type: "SERVICE",
        name: "Montaż płyt g-k i ocieplenie",
        totalPrice: 7200,
        value: 7200,
      },
      {
        id: 4,
        type: "SERVICE",
        name: "Malowanie poddasza",
        totalPrice: 2800,
        value: 2800,
      },
    ],
    totalValue: 13345,
  },
  {
    _id: "674dca100000000000000004",
    name: "Remont łazienki 6m²",
    createdAt: new Date("2025-11-25T14:20:00.000Z"),
    items: [
      {
        id: 1,
        type: "MATERIAL",
        name: "Płytki gresowe 60x60",
        quantity: 25,
        unit: "m2",
        unitPrice: 85,
        value: 2125,
      },
      {
        id: 2,
        type: "MATERIAL",
        name: "Fuga Ceresit CE40",
        quantity: 10,
        unit: "opak.",
        unitPrice: 32,
        value: 320,
      },
      {
        id: 3,
        type: "SERVICE",
        name: "Układanie płytek",
        totalPrice: 3800,
        value: 3800,
      },
      {
        id: 4,
        type: "SERVICE",
        name: "Montaż armatury łazienkowej",
        totalPrice: 1500,
        value: 1500,
      },
    ],
    totalValue: 7745,
  },
];
