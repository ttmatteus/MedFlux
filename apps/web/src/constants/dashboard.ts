import { Call, RoomStatus } from "../types/dashboard";
import { PriorityLevel, getPriorityBadge } from "./priority";

const badgeProps = (priority: PriorityLevel) => {
  const badge = getPriorityBadge(priority);
  return {
    priorityColor: badge.badgeClass,
    priorityColorHex: badge.hex,
  };
};

export const MOCK_CALLS: Call[] = [
  { id: "XC23", name: "Sebastião da Silva", priority: "Emergência", ...badgeProps("Emergência"), image: true },
  { id: "CM56", name: "Carlos Alberto", priority: "Muito Urgente", ...badgeProps("Muito Urgente"), image: false },
  { id: "CM22", name: "Frederico Junior", priority: "Urgente", ...badgeProps("Urgente"), image: false },
  { id: "CM67", name: "Marta Reis", priority: "Pouco Urgente", ...badgeProps("Pouco Urgente"), image: false },
  { id: "XC23", name: "Miguel Alencar", priority: "Pouco Urgente", ...badgeProps("Pouco Urgente"), image: false },
  { id: "CM68", name: "Ana Maria Miriel", priority: "Não Urgente", ...badgeProps("Não Urgente"), image: false },
];

export const MOCK_ROOM_STATUS: RoomStatus[] = [
  { priority: "Emergência", ...badgeProps("Emergência"), status: "Ocupada" },
  { priority: "Muito Urgente", ...badgeProps("Muito Urgente"), status: "Livre" },
  { priority: "Urgente", ...badgeProps("Urgente"), status: "Livre" },
  { priority: "Pouco Urgente", ...badgeProps("Pouco Urgente"), status: "Ocupada" },
  { priority: "Não Urgente", ...badgeProps("Não Urgente"), status: "Livre" },
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

