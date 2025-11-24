import type { PriorityLevel } from "../constants/priority";

export interface TicketDTO {
  code: string;
  priority: PriorityLevel;
  patientName: string;
  notes?: string | null;
  status: string;
  createdAt: string;
}

