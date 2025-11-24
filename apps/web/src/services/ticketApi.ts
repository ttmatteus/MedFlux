import type { PriorityLevel } from "../constants/priority";
import { PRIORITY_ORDER } from "../constants/priority";
import type { TicketDTO } from "../types/ticket";

const API_BASE_URL =
  (import.meta as unknown as { env: { VITE_API_BASE_URL?: string } }).env
    .VITE_API_BASE_URL ?? "http://localhost:8000/api";

type ApiTicket = {
  code: string;
  priority: string;
  patient_name?: string | null;
  notes?: string | null;
  status: string;
  created_at: string;
};

const CANONICAL_PRIORITY = PRIORITY_ORDER.reduce<Map<string, PriorityLevel>>(
  (map, level) => {
    map.set(removeAccents(level), level);
    return map;
  },
  new Map(),
);

function removeAccents(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function normalizePriority(priority: string): PriorityLevel {
  const canonical = removeAccents(priority);
  return CANONICAL_PRIORITY.get(canonical) ?? "Não Urgente";
}

const authHeaders = (): Record<string, string> => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const mapTicket = (ticket: ApiTicket): TicketDTO => ({
  code: ticket.code,
  priority: normalizePriority(ticket.priority),
  patientName: ticket.patient_name ?? "Paciente",
  notes: ticket.notes,
  status: ticket.status,
  createdAt: ticket.created_at,
});

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const detail = (payload as { detail?: string }).detail;
    throw new Error(detail ?? "Falha ao comunicar com a API de tickets.");
  }
  return response.json() as Promise<T>;
}

export interface CreateTicketDTO {
  patientName: string;
  priority: PriorityLevel;
  notes?: string;
}

export const createTicket = async (
  payload: CreateTicketDTO,
): Promise<TicketDTO> => {
  const response = await fetch(`${API_BASE_URL}/tickets`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      patient_name: payload.patientName,
      priority: payload.priority,
      notes: payload.notes,
    }),
  });

  const data = await handleResponse<{ ticket: ApiTicket }>(response);
  return mapTicket(data.ticket);
};

export const listTickets = async (priority?: PriorityLevel): Promise<TicketDTO[]> => {
  const params = new URLSearchParams();
  if (priority) {
    params.set("priority", priority);
  }

  const response = await fetch(
    `${API_BASE_URL}/tickets${params.toString() ? `?${params.toString()}` : ""}`,
    {
      method: "GET",
      headers: authHeaders(),
    },
  );
  const data = await handleResponse<{ tickets: ApiTicket[] }>(response);
  return data.tickets.map(mapTicket);
};

export const callNextTicket = async (
  priority: PriorityLevel,
): Promise<TicketDTO | null> => {
  const response = await fetch(`${API_BASE_URL}/tickets/${encodeURIComponent(priority)}/call`, {
    method: "POST",
    headers: authHeaders(),
  });

  if (response.status === 404) {
    return null;
  }

  const data = await handleResponse<{ ticket: ApiTicket }>(response);
  return mapTicket(data.ticket);
};

export const getTicketHistory = async (limit = 5): Promise<TicketDTO[]> => {
  const response = await fetch(`${API_BASE_URL}/tickets/history?limit=${limit}`, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await handleResponse<{ tickets: ApiTicket[] }>(response);
  return data.tickets.map(mapTicket);
};

