import { Call, RoomStatus } from "../types/dashboard";

export const MOCK_CALLS: Call[] = [
  { id: "XC23", name: "Sebastião da Silva", priority: "Emergência", priorityColor: "bg-red-500", priorityColorHex: "#EF4444", image: true },
  { id: "CM56", name: "Carlos Alberto", priority: "Muito Urgente", priorityColor: "bg-orange-500", priorityColorHex: "#F97316", image: false },
  { id: "CM22", name: "Frederico Junior", priority: "Urgente", priorityColor: "bg-yellow-400", image: false },
  { id: "CM67", name: "Marta Reis", priority: "Pouco Urgente", priorityColor: "bg-green-500", priorityColorHex: "#22C55E", image: false },
  { id: "XC23", name: "Miguel Alencar", priority: "Pouco Urgente", priorityColor: "bg-green-500", priorityColorHex: "#22C55E", image: false },
  { id: "CM68", name: "Ana Maria Miriel", priority: "Não Urgente", priorityColor: "bg-cyan-400", image: false },
];

export const MOCK_ROOM_STATUS: RoomStatus[] = [
  { priority: "Emergência", priorityColor: "bg-red-500", priorityColorHex: "#EF4444", status: "Ocupada" },
  { priority: "Muito Urgente", priorityColor: "bg-orange-500", priorityColorHex: "#F97316", status: "Livre" },
  { priority: "Urgente", priorityColor: "bg-yellow-400", status: "Livre" },
  { priority: "Pouco Urgente", priorityColor: "bg-green-500", priorityColorHex: "#22C55E", status: "Ocupada" },
  { priority: "Não Urgente", priorityColor: "bg-cyan-400", status: "Livre" },
];

export const DASHBOARD_STYLES = {
  colors: {
    background: "#F4F5F5",
    headerBar: "#98dada",
    white: "#ffffff",
    black: "#000000",
    gray: {
      light: "#F0F0F0",
      medium: "#D2CCCC",
      dark: "#999999",
      hover: "#F5F5F5",
    },
    text: {
      primary: "#000000",
      secondary: "#1D1D1D",
      tertiary: "#999999",
      light: "#D2CCCC",
    },
  },
  spacing: {
    headerHeight: "68px",
    headerBarHeight: "12px",
    contentPadding: "135px",
    contentBottomPadding: "181px",
    contentTopMargin: "96px",
    cardGap: "16px",
    cardVerticalGap: "15px",
  },
  typography: {
    fontFamily: "Inter",
    sizes: {
      xs: "12px",
      sm: "13px",
      base: "14px",
      md: "16px",
      lg: "20px",
      xl: "24px",
    },
  },
} as const;

