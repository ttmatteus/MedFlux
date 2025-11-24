import { RoomStatus } from "../types/dashboard";
import { PRIORITY_ORDER } from "./priority";

export const ROOM_STATUS: RoomStatus[] = [
  { priority: "Emergência", status: "Ocupada" },
  { priority: "Muito Urgente", status: "Livre" },
  { priority: "Urgente", status: "Livre" },
  { priority: "Pouco Urgente", status: "Ocupada" },
  { priority: "Não Urgente", status: "Livre" },
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

export const sortTicketsByPriority = <T extends { priority: string }>(tickets: T[]) => {
  return [...tickets].sort(
    (a, b) =>
      PRIORITY_ORDER.indexOf(a.priority as (typeof PRIORITY_ORDER)[number]) -
      PRIORITY_ORDER.indexOf(b.priority as (typeof PRIORITY_ORDER)[number]),
  );
};

